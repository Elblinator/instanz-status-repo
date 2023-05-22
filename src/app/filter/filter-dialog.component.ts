/* eslint-disable no-unexpected-multiline */
import { ChangeDetectorRef, ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormControlName, FormGroup } from '@angular/forms';
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
	protected allInst: FormControlName | undefined;

	protected comesFromService = false;
	protected comesFromInstanzen = false;

	protected offline = true;
	protected online = true;
	protected fast = true;
	protected slow = true;
	protected error = true;
	protected allInstActiv = false;
	protected allInstDeact = false;
	protected allServ = true;



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
		this.initiate();
	}

	/**
	 * activate only selected filter 
	 * !! also activates the actual presented instances and services and not the dummies for the filter-presentation
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

	private initiate(): void {
		this.switchFast();
		this.switchOffline();
		this.switchSlow();
		this.switchError();
		this.setFilter();
	}

	/** deactivate/activate all Instances 
	 * the status quo from services (which are already actived/deactivated) is: this.serv in [(...), this.serv]
	 * which way to switch to (active/deactive) controlled by boolean: this.allInst
	*/
	protected deactivateAllInst(): void {
		this.filterService.setDummyFilter([this._formBuilder.group(Object.fromEntries(this.instances.getValue().map(e => [e, false]))), this.serv]);
		this.switchBooleans(false);
		this.allInstActiv = false;
	}
	/** deactivate/activate all Instances 
	 * the status quo from services (which are already actived/deactivated) is: this.serv in [(...), this.serv]
	 * which way to switch to (active/deactive) controlled by boolean: this.allInst
	*/
	protected activateAllInst(): void {
		this.filterService.setDummyFilter([this._formBuilder.group(Object.fromEntries(this.instances.getValue().map(e => [e, true]))), this.serv]);
		this.switchBooleans(true);
		this.allInstDeact = false;
	}
	/** deactivate/activate all Services 
	 * the status quo from instances (which are already actived/deactivated) is: this.inst in [this.inst, (...)]
	 * which way to switch to (active/deactive) controlled by boolean: this.allServ
	*/
	protected switchAllServ(): void {
		this.filterService.setDummyFilter([this.inst, this._formBuilder.group(Object.fromEntries(this.services.getValue().map(e => [e, this.allServ])))]);
	}

	/** deactivate/activate all offline Instances 
	 * the status quo (which are already actived/deactivated) is: [this.inst, this.serv]
	 * which way to switch to (active/deactive) controlled by boolean: this.offline
	 * indication which group needs switching in the string 'offline
	*/
	protected switchOffline(): void {
		this.filterService.setDummyFilterBox([this.inst, this.serv], this.offline, 'offline');
		this.checkAllInstBoo();
	}
	/** deactivate/activate all offline Instances 
	 * the status quo (which are already actived/deactivated) is: [this.inst, this.serv]
	 * which way to switch to (active/deactive) controlled by boolean: this.offline
	 * indication which group needs switching in the string 'offline
	*/
	protected switchOnline(): void {
		this.filterService.setDummyFilterBox([this.inst, this.serv], this.online, 'online');
		this.checkAllInstBoo();
		this.fast = this.online;
		this.slow = this.online;
		this.error = this.online;
	}
	/** deactivate/activate all fast Instances 
	 * the status quo (which are already actived/deactivated) is: [this.inst, this.serv]
	 * which way to switch to (active/deactive) controlled by boolean: this.fast
	 * indication which group needs switching in the string 'fast
	*/
	protected switchFast(): void {
		this.filterService.setDummyFilterBox([this.inst, this.serv], this.fast, 'fast');
		this.checkAllInstBoo();
		this.checkOnlineBoo();
	}
	/** deactivate/activate all slow Instances 
	 * the status quo (which are already actived/deactivated) is: [this.inst, this.serv]
	 * which way to switch to (active/deactive) controlled by boolean: this.slow
	 * indication which group needs switching in the string 'slow
	*/
	protected switchSlow(): void {
		this.filterService.setDummyFilterBox([this.inst, this.serv], this.slow, 'slow');
		this.checkAllInstBoo();
		this.checkOnlineBoo();
	}
	/** deactivate/activate all error Instances 
	 * the status quo (which are already actived/deactivated) is: [this.inst, this.serv]
	 * which way to switch to (active/deactive) controlled by boolean: this.error
	 * indication which group needs switching in the string 'error
	*/
	protected switchError(): void {
		this.filterService.setDummyFilterBox([this.inst, this.serv], this.error, 'error');
		this.checkAllInstBoo();
		this.checkOnlineBoo();
	}

	private checkAllInstBoo(): void {
		if (!(this.online && this.offline)) {
			this.allInstActiv = false;
		}
		if (this.online || this.offline) {
			this.allInstDeact = false;
		}
		if (this.online && this.offline) {
			this.allInstActiv = true;
		}
		if (!(this.online || this.offline)) {
			this.allInstDeact = true;
		}
	}

	private checkOnlineBoo(): void {
		if (!(this.fast || this.slow || this.error)) {
			this.online = false;
		}
		if (this.fast && this.slow && this.error) {
			this.online = true;
		}
	}

	private switchBooleans(boo: boolean): void {
		this.online = boo;
		this.offline = boo;
		this.fast = boo;
		this.slow = boo;
		this.error = boo;
	}
}
