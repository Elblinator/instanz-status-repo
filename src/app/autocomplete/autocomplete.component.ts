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
            this.instanceNamenListObs = this.instanceNamen.valueChanges.pipe(
                startWith(''),
                map(value => this._filter(value || '')),
            );
        })
    }
    protected resetList(): void {
        // manage that this part is only activated after you go out of the input 
        console.log(this.instanceNamen);
        const empty = '';
        this.instanceNamenListObs = this.instanceNamen.valueChanges.pipe(
            startWith(''),
            map(empty => this._filter(empty || '')),
        );
        // this.instanceNamenListObs = this.instanceNamen.valueChanges.pipe(
        //     startWith(''),
        //     map(value => {
        //         value
        //         return this.filterService.reachableInstances().getValue().filter(option => option.toLowerCase().includes(''));
        //     }),
        // );
        // this.instanceNamen = new FormControl('');
        console.log(this.instanceNamen)
        console.log('hi')
    }

    private _filter(value: string): string[] {
        const filterValue = value.toLowerCase();
        return this.filterService.reachableInstances().getValue().filter(option => option.toLowerCase().includes(filterValue));
    }
}

