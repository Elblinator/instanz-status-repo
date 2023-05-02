import { Injectable } from '@angular/core';
import { BehaviorSubject} from 'rxjs';

import { InstanceService, RealInstance } from './00_data/interfaces'

import { FilterService } from './filter.service';



@Injectable({ providedIn: 'root' })
export class StatusService {
	public filteredInstancesSubject: BehaviorSubject<RealInstance[]> = new BehaviorSubject<RealInstance[]>([]);
	/** sorted Data */
	public instancesSortSubject: BehaviorSubject<InstanceService[][]> = new BehaviorSubject<InstanceService[][]>([]);
	/**  Behaviours for status */
	public instancesSortSubject_offline: BehaviorSubject<InstanceService[]> = new BehaviorSubject<InstanceService[]>([]);
	public instancesSortSubject_fast: BehaviorSubject<InstanceService[]> = new BehaviorSubject<InstanceService[]>([]);
	public instancesSortSubject_slow: BehaviorSubject<InstanceService[]> = new BehaviorSubject<InstanceService[]>([]);
	public instancesSortSubject_error: BehaviorSubject<InstanceService[]> = new BehaviorSubject<InstanceService[]>([]);

	public instancesAmountSubj: BehaviorSubject<number[]> = new BehaviorSubject<number[]>([]);
	public instancesAmount: number[] = [];
	///////////////////////////////////////////////

	/** placeholder for current instance and 4 arrays to fill the stati */
	private curInstServ: InstanceService = { instance: "", service: "", status: "" };
	private instanceOffline: InstanceService[] = [];
	private instanceFast: InstanceService[] = [];
	private instanceSlow: InstanceService[] = [];
	private instanceError: InstanceService[] = [];
	///////////////////////////////////////////

	constructor(
		private filterService: FilterService
	) {
		this.updateData()
	}

	/** 
	 * initialises the data at the beginning
	 * and updates the data every interval (see app.component ngOnInit())
	 */
	public updateData(): void {
		this.filteredInstancesSubject = this.filterService.filteredInstancesSubject;
		this.filterService.filteredInstancesSubject.subscribe(() => {
			this.sortDataBehaviourReal()
		})
	}


	/**
	 * puts sorted data (sorted by status and running) into BehaviourSubject
	 */
	public sortDataBehaviourReal(): void {
		this.instancesSortSubject.next(this.sortDataReal());
		this.instancesSortSubject_error.next(this.instanceError);
		this.instancesSortSubject_slow.next(this.instanceSlow);
		this.instancesSortSubject_offline.next(this.instanceOffline);
		this.instancesSortSubject_fast.next(this.instanceFast);

		this.instancesAmount = [
			this.instanceError.length,
			this.instanceSlow.length,
			this.instanceOffline.length,
			this.instanceFast.length
		]
		this.instancesAmountSubj.next(this.instancesAmount)
		
	}

	/**
	 * if an instance is not running it's pushed onto instanceOffline otherwise it's forwarded to sortStatus().
	 * @returns an Array with Arrays, the Arrays are filled dependend on their status
	 *  return value = [instanceOffline, instanceError, instanceSlow, instanceFast]
	 */
	public sortDataReal(): InstanceService[][] {
		this.instanceOffline = [];
		this.instanceError = [];
		this.instanceSlow = [];
		this.instanceFast = [];
		for (const instance of this.filteredInstancesSubject.getValue()) {
			if (instance.status === 'stopped') {
				this.curInstServ = { instance: instance.name, service: "", status: "offline" };
				this.instanceOffline.push(this.curInstServ);
			} else {
				this.sortStatus(instance);
			}
		}
		return [this.instanceError, this.instanceSlow, this.instanceOffline, this.instanceFast];
	}

	/**
	 * only running instances are sorted here
	 * instance is pushed to it's corresponding array
	 * @param instance 
	 */
	private sortStatus(instance: RealInstance): void {
		for (const service of instance.services) {
			this.curInstServ = { instance: instance.name, service: service.name, status: service.status };
			if (this.filterService.isRunningGreen(service.status)) {
				this.instanceFast.push(this.curInstServ);
			}
			else if (this.filterService.isRunningYellow(service.status)) {
				this.instanceSlow.push(this.curInstServ);
			}
			else if (this.filterService.isRunningRed(service.status)) {
				this.instanceError.push(this.curInstServ);
			} else {
				console.log('No known usage for ', service.status)
			}
		}
	}
}