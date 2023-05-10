/* eslint-disable no-unexpected-multiline */
import { ChangeDetectorRef, ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';

import { DialogData } from '../00_data/interfaces';

import { FilterService } from '../filter.service';

@Component({
	selector: 'app-dialog',
	templateUrl: './filter-dialog.component.html',
	styleUrls: ['./filter-dialog.component.css'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilterComponent {
	/** complete list of all possible Instances */
	protected instances: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);
	/** complete list of all possible Services */
	protected services: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);
	protected inst: FormGroup;
	protected serv: FormGroup;

	protected comesFromService = false;
	protected comesFromInstanzen = false;

	protected offline = true;
	protected fast = true;
	protected slow = true;
	protected error = true;


	constructor(
		@Inject(MAT_DIALOG_DATA) public data: DialogData,
		private filterService: FilterService,
		private _formBuilder: FormBuilder,
		private ref: ChangeDetectorRef,
	) {
		this.filterService.updateFilter()
		this.instances = this.filterService.reachableInstances();
		this.services = this.filterService.reachableService();

		this.inst = this._formBuilder.group(Object.fromEntries(this.instances.getValue().map(e => [e, (this.filterService.isActivated(e))])));
		this.serv = this._formBuilder.group(Object.fromEntries(this.services.getValue().map(e => [e, (this.filterService.isActivated(e))])));

		this.comesFromService = this.filterService.comesFromService
		this.comesFromInstanzen = this.filterService.comesFromInstanzen

		this.filterService.activatedInstances().subscribe(() => {
			this.inst = this._formBuilder.group(Object.fromEntries(this.instances.getValue().map(e => [e, (this.filterService.isActivatedDummy(e))])));
		})
		this.filterService.activatedService().subscribe(() => {
			this.serv = this._formBuilder.group(Object.fromEntries(this.services.getValue().map(e => [e, (this.filterService.isActivatedDummy(e))])));
		})
	}

	/**
	 * activate only selected filter 
	 */
	protected setFilter() {
		this.filterService.setFilter([this.inst, this.serv]);
	}

	/**
	 * pushes the pointer currentInstanc onto an empty Instance to point to a white background colour
	 * @returns a placeholder string because ngClass needs a string as return
	 */
	protected setInstEmpty(): string {
		this.filterService.setInstEmpty();
		return ''
	}

	protected activateAllInst(): void {
		this.filterService.setDummyFilter([this._formBuilder.group(Object.fromEntries(this.instances.getValue().map(e => [e, true]))), this.serv]);
	}
	protected activateAllServ(): void {
		this.filterService.setDummyFilter([this.inst, this._formBuilder.group(Object.fromEntries(this.services.getValue().map(e => [e, true])))]);
	}
	protected deactivateAllInst(): void {
		this.filterService.setDummyFilter([this._formBuilder.group(Object.fromEntries(this.instances.getValue().map(e => [e, false]))), this.serv]);
	}
	protected deactivateAllServ(): void {
		this.filterService.setDummyFilter([this.inst, this._formBuilder.group(Object.fromEntries(this.services.getValue().map(e => [e, false])))]);
	}

	protected switchOffline(): void {
		this.filterService.setDummyFilterBox([this.inst, this.serv], this.offline, 'offline');
	}
	protected switchFast(): void {
		this.filterService.setDummyFilterBox([this.inst, this.serv], this.fast, 'fast');
	}
	protected switchSlow(): void {
		this.filterService.setDummyFilterBox([this.inst, this.serv], this.slow, 'slow');
	}
	protected switchError(): void {
		this.filterService.setDummyFilterBox([this.inst, this.serv], this.error, 'error');
	}
}
