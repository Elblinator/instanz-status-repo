import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormControl } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';

import { InstanceService, RealInstance } from '../00_data/interfaces';

import { FilterComponent } from '../filter/filter-dialog.component';

import { StatusService } from '../status.service';
import { FilterService } from '../filter.service';
import { DataService } from '../data.service';


@Component({
	selector: 'app-stati',
	templateUrl: './stati.component.html',
	styleUrls: ['./stati.component.css'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class StatiComponent implements OnInit {
	////////// Header /////////////
	protected filteredInstancesObservable: Observable<RealInstance[]> | undefined;
	protected instanceNamenList: Observable<string[]> = new Observable<string[]>
	protected instanceNamen: FormControl<string | null> = new FormControl('');
	//////////////////////////////

	public realInstancesSubject: BehaviorSubject<RealInstance[]> = new BehaviorSubject<RealInstance[]>([]);

	protected instance_offline_Observable: Observable<InstanceService[]> | undefined;
	protected instance_fast_Observable: Observable<InstanceService[]> | undefined;
	protected instance_slow_Observable: Observable<InstanceService[]> | undefined;
	protected instance_error_Observable: Observable<InstanceService[]> | undefined;

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

		this.filteredInstancesObservable = this.filterService.filteredInstancesSubject as Observable<RealInstance[]>;
		console.log(this.filteredInstancesObservable)
		this.instanceNamenList = this.filterService.reachableInstances() as Observable<string[]>;
		this.dataService.realInstancesSubject.subscribe(() => {
			this.updateData()
			this.sortDataBehaviour();
		})
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
	protected isActivatedService(status: string): boolean {
		return this.filterService.isActivatedService(status);
	}

	/**
	 * @gets an Array with Arrays, the Arrays are filled dependend on their status.
	 * array = [instance_offline, instance_error, instance_slow, instance_fast].
	 * This function fills it's own arrays accordingly
	 */
	private sortDataBehaviour(): void {
		this.statusService.sortDataBehaviourReal();

		this.instance_offline_Observable = this.statusService.instancesSortSubject_offline as Observable<InstanceService[]>;
		this.instance_fast_Observable = this.statusService.instancesSortSubject_fast as Observable<InstanceService[]>;
		this.instance_slow_Observable = this.statusService.instancesSortSubject_slow as Observable<InstanceService[]>;
		this.instance_error_Observable = this.statusService.instancesSortSubject_error as Observable<InstanceService[]>;
	}

	private updateData(): void {
		this.filterService.updateFilter();

		this.realInstancesSubject = this.dataService.realInstancesSubject
	}
}