import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

import { FilterService } from '../filter.service';

@Component({
    selector: 'app-autocomplete',
    templateUrl: './autocomplete.component.html',
    styleUrls: ['./autocomplete.component.css']
})
export class AutocompleteComponent implements OnInit {
    protected instanceNamenListObs: Observable<string[]> = new Observable<string[]>
    protected instanceNamenList: string[] = [];
    protected instanceNamen = new FormControl('');

    constructor(
        private filterService: FilterService
    ) { }

    public ngOnInit(): void {
        this.instanceNamenListObs = this.instanceNamen.valueChanges.pipe(
            startWith(''),
            map(value => this._filter(value || '')),
        );
        this.filterService.reachableInstances().subscribe(() => {
            this.fillList();
        })
    }

    private fillList() {
        this.instanceNamenListObs = this.instanceNamen.valueChanges.pipe(
            startWith(''),
            map(value => this._filter(value || '')),
        );
    }

    private _filter(value: string): string[] {
        const filterValue = value.toLowerCase();
        return this.filterService.reachableInstances().getValue().filter(option => option.toLowerCase().includes(filterValue));
    }
}

