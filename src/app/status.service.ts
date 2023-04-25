import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { InstanceService, RealInstance, SimpleInstance } from './00_data/interfaces'
import { DataService } from './data.service';



@Injectable({ providedIn: 'root' })
export class StatusService {
	public realInstancesSubject: BehaviorSubject<RealInstance[]> = new BehaviorSubject<RealInstance[]>([]);
	public simpleInstancesSubject: BehaviorSubject<SimpleInstance[]> = new BehaviorSubject<SimpleInstance[]>([]);
	/** sorted Data */
	public instancesSortSubject: BehaviorSubject<InstanceService[][]> = new BehaviorSubject<InstanceService[][]>([]);
	/**last watched instance (see instance-detail) */
	public currentInstancesSubject: BehaviorSubject<(RealInstance[])> = new BehaviorSubject<RealInstance[]>([{name: "", status: "", services: [{ name: "", status: "" }] }]);
	/**  Behaviours for status */
	
	public instancesSortSubject_offline: BehaviorSubject<InstanceService[]> = new BehaviorSubject<InstanceService[]>([]);
	public instancesSortSubject_fast: BehaviorSubject<InstanceService[]> = new BehaviorSubject<InstanceService[]>([]);
	public instancesSortSubject_slow: BehaviorSubject<InstanceService[]> = new BehaviorSubject<InstanceService[]>([]);
	public instancesSortSubject_error: BehaviorSubject<InstanceService[]> = new BehaviorSubject<InstanceService[]>([]);
	///////////////////////////////////////////////

	/** placeholder for current instance and 4 arrays to fill the stati */
	private curInstServ: InstanceService = { instance: "", service: "", status: "" };
	private instanceOffline: InstanceService[] = [];
	private instanceFast: InstanceService[] = [];
	private instanceSlow: InstanceService[] = [];
	private instanceError: InstanceService[] = [];
	///////////////////////////////////////////

	constructor(
		private dataService: DataService
	) { this.updateData() }

	/** 
	 * initialises the data at the beginning
	 * and updates the data every interval (see app.component ngOnInit())
	 */
	public updateData(): void {
		this.simpleInstancesSubject = this.dataService.simpleInstancesSubject;
		this.realInstancesSubject = this.dataService.realInstancesSubject;
	}
	/** 
	 * c
	 */
	public getData(): void {
		this.sortDataBehaviourReal()
	}

	/**
	 * @param name = name from an instance
	 * saves the searched instance in this.currentInstancesSubject
	 */
	public getInst(name: string): void {
		const a = this.realInstancesSubject.getValue().find(h => h.name === name);
		if (!(typeof (a) === 'undefined')) {
			this.currentInstancesSubject.next([a]);
		}
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
		for (const instance of this.realInstancesSubject.getValue()) {
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
			if (service.status == "fast" ||
				service.status == "running"				
				) {
				this.instanceFast.push(this.curInstServ);
			}
			else if (service.status == "slow" ||
				service.status === 'new' ||
				service.status === 'pending' ||
				service.status === 'assigned' ||
				service.status === 'accepted' ||
				service.status === 'ready' ||
				service.status === 'preparing' ||
				service.status === 'starting') {
					this.instanceSlow.push(this.curInstServ);
			}
			else if (service.status == "error" ||
					service.status === 'complete' ||
					service.status === 'failed' ||
					service.status === 'shutdown' ||
					service.status === 'rejected' ||
					service.status === 'orphaned' ||
					service.status === 'remove') {
					this.instanceError.push(this.curInstServ);
			}
		}
	}
}