import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormControl } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';

import { InstanceService, RealInstance } from '../00_data/interfaces';

import { FilterComponent } from '../filter/filter-dialog.component';

import { StatusService } from '../status.service';
import { FilterService } from '../filter.service';
import { DataService } from '../data.service';


@Component({
	selector: 'app-stati',
	templateUrl: './stati.component.html',
	styleUrls: ['./stati.component.css'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class StatiComponent implements OnInit {
	////////// Header /////////////
	protected filteredInstancesObservable: Observable<RealInstance[]> | undefined;
	protected instanceNamenList: Observable<string[]> = new Observable<string[]>
	protected instanceNamen: FormControl<string | null> = new FormControl('');
	//////////////////////////////

	public realInstancesSubject: BehaviorSubject<RealInstance[]> = new BehaviorSubject<RealInstance[]>([]);

	protected instance_offline_Observable: Observable<InstanceService[]> | undefined;
	protected instance_fast_Observable: Observable<InstanceService[]> | undefined;
	protected instance_slow_Observable: Observable<InstanceService[]> | undefined;
	protected instance_error_Observable: Observable<InstanceService[]> | undefined;
	protected instanceAmount: number[] = [];

	constructor(
		private statusService: StatusService,
		private dataService: DataService,
		private filterService: FilterService,
		private dialog: MatDialog,
		private ref: ChangeDetectorRef
	) { }

	public ngOnInit(): void {
		this.instanceNamenList = this.filterService.reachableInstances() as Observable<string[]>;

		this.instance_offline_Observable = this.statusService.instancesSortSubject_offline as Observable<InstanceService[]>;
		this.instance_fast_Observable = this.statusService.instancesSortSubject_fast as Observable<InstanceService[]>;
		this.instance_slow_Observable = this.statusService.instancesSortSubject_slow as Observable<InstanceService[]>;
		this.instance_error_Observable = this.statusService.instancesSortSubject_error as Observable<InstanceService[]>;
			
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
}