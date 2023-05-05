/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-explicit-any */


import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import {
    Component,
    ElementRef,
    EventEmitter,
    Input,
    Output,
    ViewChild, 
    OnInit
} from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { MatOptionSelectionChange } from '@angular/material/core';
import { MatSelect } from '@angular/material/select';
import { BehaviorSubject, debounceTime, distinctUntilChanged, Observable } from 'rxjs';

export type Id = number;

/**
* Base Type for everything that should be displayable
* in Shared Components
*/
export type Selectable = Displayable & Identifiable & { disabled?: boolean };
/**
 * Every displayble object should have the given functions to give the object's title.
 */
export interface Displayable {
    /**
     * Should return the title. Always used except for list view, the agenda and in the projector.
     */
    getTitle: () => string;

    /**
     * Should return the title for the list view.
     */
    getListTitle: () => string;
}
/**
 * Every object implementing this interface has an id.
 */
export interface Identifiable {
    /**
     * The objects id.
     */
    readonly id: Id;
}

@Component({
    selector: 'app-select-instance',
    templateUrl: './select-instance.component.html',
    styleUrls: ['./select-instance.component.css']
})
export class SelectInstanceComponent {

    public ngOnInit(): void {
        //Create css style for the mat-selects panel
        const sheet = document.createElement(`style`);
        sheet.innerHTML = `.os-search-selector { max-height: ${this.maxHeight} !important;}`;
        document.body.appendChild(sheet);
    }
    @ViewChild(CdkVirtualScrollViewport, { static: true })
    public cdkVirtualScrollViewPort!: CdkVirtualScrollViewport;

    @ViewChild(`matSelect`)
    public matSelect!: MatSelect;

    @ViewChild(`chipPlaceholder`, { static: false })
    public chipPlaceholder!: ElementRef<HTMLElement>;

    /**
     * Decide if this should be a single or multi-select-field
     */
    @Input()
    public multiple = false;

    /**
     * Decide, if none should be included, if multiple is false.
     */

    @Input()
    public showChips = true;

    /**
     * A function can be passed to transform a value before it is set as value of the underlying form-control.
     */
    @Input()
    public transformSetFn?: (value: any) => any; // It is actually an Ids type

    /**
     * A function can be passed to transform a value propagated from a change-event of the underlying form-control,
     * before it is propagated to the parent form-group/ng-model.
     * Useful to change the output of a form-control.
     */
    @Input()
    public transformPropagateFn: (value: any) => any = value => value; // It is actually an Ids type

    @Input()
    public set sortFn(fn: false | ((valueA: Selectable, valueB: Selectable) => number)) {
        if (typeof fn === `function` || fn === false) {
            this._sortFn = fn;
        } else {
            this._sortFn = this._defaultSortFn;
        }
    }

    @Input()
    public showEntriesNumber = 4;

    @Input()
    public excludeIds = false;

    /**
     * If true, the dialog will be opened with double width.
     */
    @Input()
    public wider = false;

    public itemSizeInPx = 50;

    public get panelHeight(): number {
        return this.showEntriesNumber * this.itemSizeInPx;
    }

    public get maxHeight(): string {
        return 112 + this.panelHeight + `px`;
    }

    // eslint-disable-next-line @typescript-eslint/adjacent-overload-signatures
    public get sortFn(): false | ((valueA: Selectable, valueB: Selectable) => number) {
        return this._sortFn;
    }

    private _defaultSortFn = (a: Selectable, b: Selectable) =>
        a && typeof a.getTitle() === `string` ? a.getTitle().localeCompare(b.getTitle()) : 0;

    private _sortFn: false | ((valueA: Selectable, valueB: Selectable) => number) = this._defaultSortFn;

    /**
     * Emits the currently searched string.
     */
    @Output()
    public clickNotFound = new EventEmitter<string>();

    @Output()
    public openedChange = new EventEmitter<boolean>();

    public contentForm!: UntypedFormControl;
    public searchValueForm!: UntypedFormControl;



    public get empty(): boolean {
        return Array.isArray(this._snapshotValue)
            ? !this._snapshotValue.length
            : this._snapshotValue === null || this._snapshotValue === undefined;
    }

    public get selectedItems(): Selectable[] {
        if (this.multiple && this.selectableItems?.length && this.contentForm.value) {
            return this.selectableItems.filter(item => this.contentForm.value.includes(item.id));
        }
        return [];
    }

    public get width(): string {
        return this.chipPlaceholder ? `${this.chipPlaceholder.nativeElement.clientWidth - 16}px` : `100%`;
    }

    public get filteredItemsObservable(): Observable<Selectable[]> {
        return this.filteredItemsSubject.asObservable();
    }

    public selectedIds: Id[] = [];

    /**
     * All items
     */
    protected set selectableItems(items: Selectable[]) {
        this._selectableItemsIdMap = {};
        const allItems = items;
        for (const item of allItems) {
            this._selectableItemsIdMap[item.id] = item;
        }
        this._selectableItemsList = this.sortFn ? allItems.sort(this.sortFn) : allItems;
        this.filteredItemsSubject.next(this.getFilteredItemsBySearchValue());
    }

    protected get selectableItems(): Selectable[] {
        return this._selectableItemsList;
    }


    protected readonly filteredItemsSubject = new BehaviorSubject<Selectable[]>([]);

    /**
     * The synchronized value of the contentForm form control.
     * Used to determine, if this form control is empty before the timeout is fulfilled.
     */
    private _snapshotValue: Selectable[] | Selectable | null = null;
    private _isFirstUpdate = true;

    private _selectableItemsIdMap: { [id: number]: Selectable } = {};
    private _selectableItemsList: Selectable[] = [];

    private get currentSearchValue(): string {
        return this.searchValueForm.value.trim().toLowerCase();
    }

    private addOrRemoveId(id: Id): void {
        if (!Array.isArray(this.selectedIds)) {
            this.selectedIds = [];
        }
        const index = this.selectedIds.indexOf(id);
        if (index > -1) {
            this.selectedIds.splice(index, 1);
        } else {
            this.selectedIds.push(id);
        }
        this.setNextValue(this.selectedIds);
    }

    public onOpenChanged(event: boolean): void {
        this.openedChange.emit(event);
        if (event) {
            this.cdkVirtualScrollViewPort.scrollToIndex(0);
            this.cdkVirtualScrollViewPort.checkViewportSize();
        }
    }
    protected onSearchValueUpdated(nextValue: string): void {
        this.filteredItemsSubject.next(this.getFilteredItemsBySearchValue(nextValue.toLowerCase()));
    }

    @ViewChild(CdkVirtualScrollViewport, { static: true })

    /**
     * Decide, if none should be included, if multiple is false.
     */
    @Input()
    public includeNone = false;

    @Input()
    public noneTitle = `–`;

    /**
     * Function to get a list filtered by the entered search value.
     *
     * @returns The filtered list of items.
     */

    private triggerUpdate(): void {
        if (this.empty) {
            return;
        }
    }

    private setNextValue(value: any): void {
        this._snapshotValue = value;
        setTimeout(() => {
            this.contentForm.setValue(value);
            this.triggerUpdate();
        });
    }

    /**
     * Function to get a list filtered by the entered search value.
     *
     * @returns The filtered list of items.
     */
    private getFilteredItemsBySearchValue(searchValue: string = this.currentSearchValue): Selectable[] {
        if (!this.selectableItems) {
            return [];
        }
        if (!searchValue.length) {
            return this.selectableItems;
        }
        const filteredItems = this.selectableItems.filter(item => {
            if (!this.excludeIds) {
                const idString = `` + item.id;
                const foundId = idString.trim().toLowerCase().indexOf(searchValue) !== -1;

                if (foundId) {
                    return true;
                }
            }
            return false
        });
        return filteredItems;
    }
}
