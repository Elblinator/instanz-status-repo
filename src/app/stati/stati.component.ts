import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { Instance, InstanceService, Status } from '../00_data/interfaces';
import { StatusService } from '../status.service';
import { DialogComponent } from '../dialog/dialog.component';
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
	instanceOnline: InstanceService[] = []
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
	private sortData(): void {
		const array = this.statusService.sortData();
		this.instanceOffline = array[0];
		this.instanceError = array[1];
		this.instanceSlow = array[2];
		this.instanceOnline = array[3];
	}
	protected openDialog(): void {
		this.dialog.open(DialogComponent);
	}
	protected isActivated(str: string): boolean {
		return this.filterService.isActivated(str);
	}
}