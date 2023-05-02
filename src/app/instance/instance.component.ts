import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormControl } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';

import { RealInstance } from '../00_data/interfaces';

import { FilterComponent } from '../filter/filter-dialog.component';

import { StatusService } from '../status.service';
import { FilterService } from '../filter.service';
import { DataService } from '../data.service';

@Component({
	selector: 'app-instance',
	templateUrl: './instance.component.html',
	styleUrls: ['./instance.component.css'],
	changeDetection: ChangeDetectionStrategy.OnPush
})

export class InstanceComponent implements OnInit {
	////////// Header /////////////
	protected realInstancesObservable: Observable<RealInstance[]> | undefined;
	protected instanceNamenList: Observable<string[]> = new Observable<string[]>
	protected instanceNamen: FormControl<string | null> = new FormControl('');
	//////////////////////////////

	public realInstancesSubject: BehaviorSubject<RealInstance[]> = new BehaviorSubject<RealInstance[]>([]);

	constructor(
		private statusService: StatusService,
		private dataService: DataService,
		private filterService: FilterService,
		private dialog: MatDialog,
		private ref: ChangeDetectorRef
	) { }

	public ngOnInit(): void {
		this.dialog.afterAllClosed.subscribe(() => {
			this.ref.markForCheck();
		})
		this.instanceNamenList = this.filterService.reachableInstances() as Observable<string[]>;

		this.realInstancesObservable = this.dataService.realInstancesSubject as Observable<RealInstance[]>;
		this.instanceNamenList = this.filterService.reachableInstances() as Observable<string[]>;
		this.dataService.realInstancesSubject.subscribe(() => {
			this.getData()
		})

		// this.filterService.filteredInstancesSubject.subscribe(() => {
		// 	this.getData()
		// })
	}

	protected openFilterDialog(): void {
		this.dialog.open(FilterComponent);
	}

	/**
	 * verify that the current data (instance- or service-name) is activated in the filter.
	 * @param instanceOrStatus = instance-name or service-name.
	 * @returns boolean if activated in the filter
	 */
	protected isActivatedReal(instanceOrStatus: string): boolean {
		if (!(instanceOrStatus === "")) {
			return this.filterService.isActivatedReal(instanceOrStatus);
		}
		return false
	}
	protected isActivatedInstance(instance: string): boolean {
		if (!(instance === "")) {
			return this.filterService.isActivatedReal(instance);
		}
		return false

	}
	protected isActivated(instanceOrStatus: string): boolean {
		return this.filterService.isActivated(instanceOrStatus);
	}
	protected isActivatedService(status: string): boolean {
		return this.filterService.isActivatedService(status);
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
	protected whatStatus(instance: RealInstance): string {
		return this.filterService.whatStatusReal(instance);
	}

	private getData(): void {
		this.filterService.updateData();
		console.log('data: ', this.dataService.realInstancesSubject)
		console.log('filtered data: ', this.filterService.filteredInstancesSubject)
	}
}