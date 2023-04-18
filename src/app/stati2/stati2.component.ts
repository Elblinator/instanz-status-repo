import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { Instance, InstanceService, Status } from '../00_data/interfaces';
import { StatusService } from '../status.service';
import { FilterComponent } from '../filter/filter-dialog.component';
import { FilterService } from '../filter.service';
import { FormControl } from '@angular/forms';


@Component({
	selector: 'app-stati2',
	templateUrl: './stati2.component.html',
	styleUrls: ['./stati2.component.css'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class Stati2Component implements OnInit {
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
		private dialog: MatDialog
	) { }

	public ngOnInit(): void {
		this.getData();
		this.sortData();
	}
	private getData(): void {
		this.statusService.getInstance()
			.subscribe(instances => { this.instances = instances });
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
	protected openFilterDialog(): void {
		this.dialog.open(FilterComponent);
	}
	/**
	 * @param instanceOrStatus 
	 * @returns if this instance or status is activated by the filter
	 */
	protected isActivated(instanceOrStatus: string): boolean {
		return this.filterService.isActivated(instanceOrStatus);
	}
	protected printMe() :void {
		console.log(this.counter)
		this.counter+=1
	}
}