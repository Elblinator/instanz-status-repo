import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';

import { DialogData } from '../00_data/interfaces';

import { FilterService } from '../filter.service';

@Component({
	selector: 'app-dialog',
	templateUrl: './filter-dialog.component.html',
	styleUrls: ['./filter-dialog.component.css'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilterComponent {
	instances: string[] = [];
	services: string[] = [];
	inst: FormGroup;
	serv: FormGroup;

	constructor(
		@Inject(MAT_DIALOG_DATA) public data: DialogData,
		private filterService: FilterService,
		private _formBuilder: FormBuilder,
	) {
		this.instances = this.filterService.reachableInstances();
		this.services = this.filterService.reachableService();

		this.inst = this._formBuilder.group(Object.fromEntries(this.instances.map(e => [e, (this.filterService.isActivated(e))])));
		this.serv = this._formBuilder.group(Object.fromEntries(this.services.map(e => [e, (this.filterService.isActivated(e))])));

		this.filterService.setFilter([this.inst, this.serv]);
	}
	/**
	 * activate only selected filter 
	 */
	protected setFilter() {
		this.filterService.setFilter([this.inst, this.serv]);
	}
}
