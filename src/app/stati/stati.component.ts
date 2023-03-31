import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { Instance, InstanceService, Status } from '../00_data/interfaces';
import { StatusService } from '../status.service';
import { FilterComponent } from '../filter/filter-dialog.component';
import { FilterService } from '../filter.service';
import { FormControl } from '@angular/forms';


@Component({
	selector: 'app-stati',
	templateUrl: './stati.component.html',
	styleUrls: ['./stati.component.css']
})
export class StatiComponent implements OnInit {
	instances: Instance[] = []
	stati: Status[] = [];
	curInstServ: InstanceService = { instance: "", service: "", status: "" }
	instanceOffline: InstanceService[] = []
	instanceFast: InstanceService[] = []
	instanceSlow: InstanceService[] = []
	instanceError: InstanceService[] = []
	instanceNamenList: string[] = this.filterService.reachableInstances()
	instanceNamen = new FormControl('')

	constructor(
		private statusService: StatusService,
		private filterService: FilterService,
		private dialog: MatDialog,
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
	 * array = [instanceOffline, instanceError, instanceSlow, instanceFast].
	 * This function fills it's own arrays accordingly
	 */
	private sortData(): void {
		const array = this.statusService.sortData();
		this.instanceOffline = array[0];
		this.instanceError = array[1];
		this.instanceSlow = array[2];
		this.instanceFast = array[3];
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
}