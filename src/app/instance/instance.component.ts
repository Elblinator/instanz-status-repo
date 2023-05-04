import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormControl } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';

import { RealInstance } from '../00_data/interfaces';

import { FilterComponent } from '../filter/filter-dialog.component';

import { BackgroundPossibilities, FilterService } from '../filter.service';



@Component({
	selector: 'app-instance',
	templateUrl: './instance.component.html',
	styleUrls: ['./instance.component.css'],
	changeDetection: ChangeDetectionStrategy.OnPush
})

export class InstanceComponent implements OnInit {
	////////// Header /////////////
	protected filteredInstancesObservable: Observable<RealInstance[]> | undefined;
	protected instanceNamenList: Observable<string[]> = new Observable<string[]>
	protected instanceNamen: FormControl<string | null> = new FormControl('');
	//////////////////////////////

	protected realInstancesSubject: BehaviorSubject<RealInstance[]> = new BehaviorSubject<RealInstance[]>([]);

	protected worstStatusArrSubj: Observable<BackgroundPossibilities[]> = new Observable<BackgroundPossibilities[]>;
	protected worstStatusArr: BackgroundPossibilities[] = [];

	constructor(
		private filterService: FilterService,
		private dialog: MatDialog,
		private ref: ChangeDetectorRef
	) { }

	public ngOnInit(): void {
		this.instanceNamenList = this.filterService.reachableInstances() as Observable<string[]>;
		this.filteredInstancesObservable = this.filterService.filteredInstancesSubject as Observable<RealInstance[]>;
		this.worstStatusArrSubj = this.filterService.worstStatusArrSubj as Observable<BackgroundPossibilities[]>;
		this.filterService.worstStatusArrSubj.subscribe(() => {
			this.worstStatusArr = this.filterService.worstStatusArr
		})
	}

	protected openFilterDialog(): void {
		this.dialog.open(FilterComponent);
	}

	protected isRunningGreen(status: string): boolean {
		return this.filterService.isRunningGreen(status);
	}
	protected isRunningYellow(status: string): boolean {
		return this.filterService.isRunningYellow(status);
	}
	protected isRunningRed(status: string): boolean {
		return this.filterService.isRunningRed(status);
	}

	/**
	 * @param instance 
	 * @returns the worst status from instance (error>slow>fast>offline)
	 */
	protected getStatus(instance: RealInstance): string {
		return this.filterService.getStatus(instance);
	}

	/**
	 * pushes the pointer currentInstanc onto this instance
	 * @param name name of current instance
	 * @returns a placeholder string because ngClass needs a string as return
	 */
	protected setInst(name: string): string { 
		this.filterService.setInst(name);
		return ''
	}
	/**
	 * pushes the pointer currentInstanc onto an empty Instance to point to a white background colour
	 * @returns a placeholder string because ngClass needs a string as return
	 */
	protected setInstEmpty(): string {
		this.filterService.setInstEmpty();
		return ''
	}
}