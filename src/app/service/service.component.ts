import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';

import { InstanceService, RealInstance, ServiceService } from '../00_data/interfaces';

import { FilterComponent } from '../filter/filter-dialog.component';

import { StatusService } from '../status.service';
import { FilterService } from '../filter.service';


@Component({
	selector: 'app-service',
	templateUrl: './service.component.html',
	styleUrls: ['./service.component.css'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ServiceComponent implements OnInit {
	////////// Header /////////////
	protected filteredInstancesObservable: Observable<RealInstance[]> | undefined;
	protected instanceNamenList: Observable<string[]> = new Observable<string[]>
	protected instanceNamen: FormControl<string | null> = new FormControl('');
	//////////////////////////////
	protected instance_offline_Observable: Observable<InstanceService[]> | undefined;
	protected instance_fast_Observable: Observable<InstanceService[]> | undefined;
	protected instance_slow_Observable: Observable<InstanceService[]> | undefined;
	protected instance_error_Observable: Observable<InstanceService[]> | undefined;
	/** 2D arrays for services */
	protected instances2D_fast: Observable<ServiceService[][]> | undefined;
	protected instances2D_slow: Observable<ServiceService[][]> | undefined;
	protected instances2D_error: Observable<ServiceService[][]> | undefined;

	protected instanceAmount: number[] = [];

	constructor(
		private statusService: StatusService,
		private filterService: FilterService,
		private dialog: MatDialog,
		private ref: ChangeDetectorRef
	) { }

	public ngOnInit(): void {
		this.instanceNamenList = this.filterService.reachableInstances() as Observable<string[]>;

		this.instance_offline_Observable = this.statusService.instancesSortSubject_offline as Observable<InstanceService[]>;

		this.instances2D_fast = this.statusService.instances2D_fast as Observable<ServiceService[][]>;
		this.instances2D_slow = this.statusService.instances2D_slow as Observable<ServiceService[][]>;
		this.instances2D_error = this.statusService.instances2D_error as Observable<ServiceService[][]>;

		this.statusService.instancesAmountSubj.subscribe(() => {
			this.instanceAmount = this.statusService.instancesAmount
		})
	}

	protected openFilterDialog(): void {
		this.dialog.open(FilterComponent);
	}

	/**
	 * verify that the current data (service-name) is activated in the filter.
	 * @param status = service-name.
	 * @returns boolean if activated in the filter
	 */
	protected isActivatedService(status: string): boolean {
		return this.filterService.isActivated(status);
	}
	
	/**
	 * pushes the pointer currentInstanc onto an empty Instance to point to a white background colour
	 * @returns a placeholder string because ngClass needs a string as return
	 */
	protected setInstEmpty(): string {
		this.filterService.setInstEmpty();
		return ''
	}
}