import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';

import { Instance, InstanceService } from '../00_data/interfaces';

import { FilterComponent } from '../filter/filter-dialog.component';

import { StatusService } from '../status.service';
import { FilterService } from '../filter.service';


@Component({
	selector: 'app-stati',
	templateUrl: './stati.component.html',
	styleUrls: ['./stati.component.css'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class StatiComponent implements OnInit {
	////////// Header /////////////
	protected instancesObservable: Observable<Instance[]> | undefined;
	protected instanceNamenList: Observable<string[]> = new Observable<string[]>
	protected instanceNamen: FormControl<string | null> = new FormControl('');
	//////////////////////////////

	protected instance_offline_Observable: Observable<InstanceService[]> | undefined;
	protected instance_fast_Observable: Observable<InstanceService[]> | undefined;
	protected instance_slow_Observable: Observable<InstanceService[]> | undefined;
	protected instance_error_Observable: Observable<InstanceService[]> | undefined;

	constructor(
		private statusService: StatusService,
		private filterService: FilterService,
		private dialog: MatDialog,
		private ref: ChangeDetectorRef
	) { }

	public ngOnInit(): void {
		this.dialog.afterAllClosed.subscribe(() => {
			this.ref.markForCheck();
		})
		this.instancesObservable = this.statusService.instancesSubject.asObservable();
		this.instanceNamenList = this.filterService.reachableInstances().asObservable();
		this.statusService.instancesSubject.subscribe(() => {
			this.filterService.updateFilter();
		})

		this.sortDataObservable();
		this.instance_offline_Observable = this.statusService.instancesSortSubject_offline.asObservable();
		this.instance_fast_Observable = this.statusService.instancesSortSubject_fast.asObservable();
		this.instance_slow_Observable = this.statusService.instancesSortSubject_slow.asObservable();
		this.instance_error_Observable = this.statusService.instancesSortSubject_error.asObservable();
	}

	protected openFilterDialog(): void {
		this.dialog.open(FilterComponent);
	}
	/**
	 * verify that the current data (instance- or service-name) is activated in the filter.
	 * @param instanceOrStatus = instance-name or service-name.
	 * @returns boolean if activated in the filter
	 */
	protected isActivated(instanceOrStatus: string): boolean {
		return this.filterService.isActivated(instanceOrStatus);
	}

	/**
	 * @gets an Array with Arrays, the Arrays are filled dependend on their status.
	 * array = [instance_offline, instance_error, instance_slow, instance_fast].
	 * This function fills it's own arrays accordingly
	 */
	private sortDataObservable(): void {
		this.statusService.sortDataObservable();
	}
}