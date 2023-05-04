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
	public instances: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);
	protected services: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);
	protected inst: FormGroup;
	protected serv: FormGroup;

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
}
