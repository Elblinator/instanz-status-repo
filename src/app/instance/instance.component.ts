import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { StatusService } from '../status.service';
import { Instance, InstanceService } from '../00_data/interfaces';
import { FilterComponent } from '../filter/filter-dialog.component';
import { FilterService } from '../filter.service';
import { FormControl } from '@angular/forms';

@Component({
	selector: 'app-instance',
	templateUrl: './instance.component.html',
	styleUrls: ['./instance.component.css'],
	changeDetection: ChangeDetectionStrategy.OnPush
})

export class InstanceComponent implements OnInit {
	instances: Instance[] = [];
	instanceNamenList: string[] = this.filterService.reachableInstances();
	instanceNamen = new FormControl('');

	instanceOffline: InstanceService[] = [];
	instanceFast: InstanceService[] = [];
	instanceSlow: InstanceService[] = [];
	instanceError: InstanceService[] = [];

	constructor(
		private statusService: StatusService,
		private filterService: FilterService,
		private dialog: MatDialog,
		private ref: ChangeDetectorRef
	) {}

	public ngOnInit(): void {
		this.statusService.getInstance()
			.subscribe(instances => { this.instances = instances });
		this.dialog.afterAllClosed.subscribe(() => {
			this.ref.markForCheck();
		})
	}
	protected openFilterDialog(): void {
		this.dialog.open(FilterComponent);
	}
	/**
	 * verify that the current data (instance- or service-name) is activated in the filter.
	 * @param data = instance-name or service-name.
	 * @returns boolean if activated in the filter
	 */
	protected isActivated(data: string): boolean {
		return this.filterService.isActivated(data);
	}
	/**
	 * @param instance 
	 * @returns the worst status from instance (error>slow>fast>offline)
	 */
	protected whatStatus(instance: Instance): string {
		//let array = this.statusService.sortData()
		const status: string[] = ["offline", "error", "slow", "fast"];
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