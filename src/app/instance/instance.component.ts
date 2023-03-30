import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { StatusService } from '../status.service';
import { Instance, InstanceService } from '../00_data/interfaces';
import { DialogComponent } from '../dialog/dialog.component';
import { FilterService } from '../filter.service';
import { FormControl } from '@angular/forms';

@Component({
	selector: 'app-instance',
	templateUrl: './instance.component.html',
	styleUrls: ['./instance.component.css']
})

export class InstanceComponent implements OnInit {
	instances: Instance[] = [];
	instanceNamenList: string[] = this.filterService.reachableInstances();
	instanceNamen = new FormControl('');

	instanceOffline: InstanceService[] = [];
	instanceOnline: InstanceService[] = [];
	instanceSlow: InstanceService[] = [];
	instanceError: InstanceService[] = [];

	constructor(
		private statusService: StatusService,
		private filterService: FilterService,
		private dialog: MatDialog,
	) { }

	public ngOnInit(): void {
		this.statusService.getInstance()
			.subscribe(instances => { this.instances = instances });
	}
	protected openDialog(): void {
		this.dialog.open(DialogComponent);
	}
	protected isActivated(str: string): boolean {
		return this.filterService.isActivated(str);
	}
	protected whatStatus(instance: Instance): string {
		//let array = this.statusService.sortData()
		const status: string[] = ["offline", "error", "slow", "online"];
		let id = 3;
		if (!instance.running) {
			id = 0;
		} else {
			instance.services.forEach(element => {
				if ("error" === element.status) {
					id = 1;
				}
				if ("slow" === element.status && id > 1) {
					id = 2;
				}
			});
		}
		return status[id];
	}
}