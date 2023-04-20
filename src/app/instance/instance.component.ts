import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';

import { StatusService } from '../status.service';
import { Instance } from '../00_data/interfaces';
import { FilterComponent } from '../filter/filter-dialog.component';
import { FilterService } from '../filter.service';

@Component({
	selector: 'app-instance',
	templateUrl: './instance.component.html',
	styleUrls: ['./instance.component.css'],
	changeDetection: ChangeDetectionStrategy.OnPush
})

export class InstanceComponent implements OnInit {
	////////// Header /////////////
	protected instancesObservable: Observable<Instance[]> | undefined;
	protected instanceNamenList: Observable<string[]> = new Observable<string[]>
	protected instanceNamen: FormControl<string | null> = new FormControl('');
	//////////////////////////////

	constructor(
		private statusService: StatusService,
		private filterService: FilterService,
		private dialog: MatDialog,
		private ref: ChangeDetectorRef
	) { }

	public ngOnInit(): void {
		this.dialog.afterAllClosed.subscribe(() => {
			this.ref.markForCheck();
		})
		this.instancesObservable = this.statusService.instancesSubject.asObservable();
		this.instanceNamenList = this.filterService.reachableInstances().asObservable();
		this.statusService.instancesSubject.subscribe(() => {
			this.filterService.updateFilter();
		})
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
	 * @param instance 
	 * @returns the worst status from instance (error>slow>fast>offline)
	 */
	protected whatStatus(instance: Instance): string {
		return this.filterService.whatStatus(instance);
	}
}