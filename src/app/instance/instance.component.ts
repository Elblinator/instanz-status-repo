import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { StatusService } from '../status.service';
import { Instance, InstanceService } from '../00_data/interfaces';
import { FilterComponent } from '../filter/filter-dialog.component';
import { FilterService } from '../filter.service';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
	selector: 'app-instance',
	templateUrl: './instance.component.html',
	styleUrls: ['./instance.component.css'],
	changeDetection: ChangeDetectionStrategy.OnPush
})

export class InstanceComponent implements OnInit {
	instancesObservable: Observable<Instance[]> | undefined;
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
		this.dialog.afterAllClosed.subscribe(() => {
			this.ref.markForCheck();
		})
		this.instancesObservable = this.statusService.instancesSubject.asObservable();
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
		return true
		return this.filterService.isActivated(instanceOrStatus);
	}

	/**
	 * @param instance 
	 * @returns the worst status from instance (error>slow>fast>offline)
	 */
	protected whatStatus(instance: Instance): string {
		return this.filterService.whatStatus(instance)
	}
}