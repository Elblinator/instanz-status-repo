import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { Instance, InstanceService, Status } from '../00_data/interfaces';
import { StatusService } from '../status.service';
import { FilterComponent } from '../filter/filter-dialog.component';
import { FilterService } from '../filter.service';
import { FormControl } from '@angular/forms';


@Component({
	selector: 'app-stati',
	templateUrl: './stati.component.html',
	styleUrls: ['./stati.component.css'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class StatiComponent implements OnInit {
	instances: Instance[] = [];
	stati: Status[] = [];
	curInstServ: InstanceService = { instance: "", service: "", status: "" };
	instance_offline: InstanceService[] = [];
	instance_fast: InstanceService[] = [];
	instance_slow: InstanceService[] = [];
	instance_error: InstanceService[] = [];
	instanceNamenList: string[] = this.filterService.reachableInstances();
	instanceNamen = new FormControl('');
	possibleStatus: string[] = ['error', 'slow', 'offline', 'fast'];
	instanceData: InstanceService[][] = [];
	counter=0;

	constructor(
		private statusService: StatusService,
		private filterService: FilterService,
		private dialog: MatDialog,
		private ref: ChangeDetectorRef
	) { }

	public ngOnInit(): void {
		this.getData();
		this.sortData();
		this.dialog.afterAllClosed.subscribe(() => {
			this.ref.markForCheck();
		})
	}
	private getData(): void {
		this.instances = this.statusService.getInstances()
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
	private sortData(): void {
		const array = this.statusService.sortData();
		this.instanceData = array;
		this.instance_error = array[0];
		this.instance_slow = array[1];
		this.instance_offline = array[2];
		this.instance_fast = array[3];
	}
}