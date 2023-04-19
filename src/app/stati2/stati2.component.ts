import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { Instance, InstanceService } from '../00_data/interfaces';
import { StatusService } from '../status.service';
import { FilterComponent } from '../filter/filter-dialog.component';
import { FilterService } from '../filter.service';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';


@Component({
	selector: 'app-stati2',
	templateUrl: './stati2.component.html',
	styleUrls: ['./stati2.component.css'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class Stati2Component implements OnInit {
	instancesObservable: Observable<Instance[]> | undefined;
	
	instanceData_Observable: Observable<InstanceService[][]> | undefined;
	instance_offline_Observable: Observable<InstanceService[]> | undefined;
	instance_fast_Observable: Observable<InstanceService[]> | undefined;
	instance_slow_Observable: Observable<InstanceService[]> | undefined;
	instance_error_Observable: Observable<InstanceService[]> | undefined;

	instanceNamenList: string[] = this.filterService.reachableInstances();
	instanceNamen = new FormControl('');
	possibleStatus: string[] = ['error', 'slow', 'offline', 'fast'];

	constructor(
		private statusService: StatusService,
		private filterService: FilterService,
		private dialog: MatDialog,
		private ref: ChangeDetectorRef
	) { }

	public ngOnInit(): void {
		this.sortDataObservable();
		this.instanceData_Observable = this.statusService.instancesSortSubject.asObservable();
		this.instance_offline_Observable = this.statusService.instancesSortSubject_offline.asObservable();
		this.instance_fast_Observable = this.statusService.instancesSortSubject_fast.asObservable();
		this.instance_slow_Observable = this.statusService.instancesSortSubject_slow.asObservable();
		this.instance_error_Observable = this.statusService.instancesSortSubject_error.asObservable();

		this.dialog.afterAllClosed.subscribe(() => {
			this.ref.markForCheck();
		})
	}
	protected openFilterDialog(): void {
		this.dialog.open(FilterComponent);
	}
	/**
	 * @param instanceOrStatus 
	 * @returns if this instance or status is activated by the filter
	 */
	protected isActivated(instanceOrStatus: string): boolean {
		return true
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