import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { InstanceService, RealInstance, ServiceService } from './00_data/interfaces'

import { FilterService } from './filter.service';
import { SERVICE } from './00_data/magic_strings';



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
	/** 2D arrays for services */
	public instances2D_fast: BehaviorSubject<ServiceService[][]> = new BehaviorSubject<ServiceService[][]>([]);
	public instances2D_slow: BehaviorSubject<ServiceService[][]> = new BehaviorSubject<ServiceService[][]>([]);
	public instances2D_error: BehaviorSubject<ServiceService[][]> = new BehaviorSubject<ServiceService[][]>([]);
	private curServServ: ServiceService = { instance: "", service: "" };
	private curServServArr: ServiceService[][] = [];

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
			this.sortServices()
		})
	}


	/**
	 * puts sorted data (sorted by status and running) into BehaviourSubject
	 */
	private sortDataBehaviourReal(): void {
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
	private sortDataReal(): InstanceService[][] {
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

	private sortServices(): void {
		this.sortService(this.instanceFast, this.instances2D_fast)
		this.sortService(this.instanceSlow, this.instances2D_slow)
		this.sortService(this.instanceError, this.instances2D_error)
	}
	private sortService(arr: InstanceService[], goal: BehaviorSubject<ServiceService[][]>): void {
		for (const instance of arr) {
			this.curServServ = { instance: instance.instance, service: instance.service };
			this.determineService(this.curServServ)
		}
		goal.next(this.curServServArr)
	}

	private determineService(inst: ServiceService): void {
		this.curServServArr = [[], [], [], [], [], [], [], [], [], [], [], [], [], []];
		if (!(typeof inst === 'undefined')) {
			if (inst.service === SERVICE.AUTH) {
				this.curServServArr[0].push(inst);
			} else if (inst.service === SERVICE.AUTOUPDATE) {
				this.curServServArr[1].push(inst);
			} else if (inst.service === SERVICE.BACKENDACTION) {
				this.curServServArr[2].push(inst);
			} else if (inst.service === SERVICE.BACKENDMANAGE) {
				this.curServServArr[3].push(inst);
			} else if (inst.service === SERVICE.BACKENDPRESENTER) {
				this.curServServArr[4].push(inst);
			} else if (inst.service === SERVICE.CLIENT) {
				this.curServServArr[5].push(inst);
			} else if (inst.service === SERVICE.DATASTOREREADER) {
				this.curServServArr[6].push(inst);
			} else if (inst.service === SERVICE.DATASTOREWRITER) {
				this.curServServArr[7].push(inst);
			} else if (inst.service === SERVICE.ICC) {
				this.curServServArr[8].push(inst);
			} else if (inst.service === SERVICE.MANAGE) {
				this.curServServArr[9].push(inst);
			} else if (inst.service === SERVICE.MEDIA) {
				this.curServServArr[10].push(inst);
			} else if (inst.service === SERVICE.PROXY) {
				this.curServServArr[11].push(inst);
			} else if (inst.service === SERVICE.REDIS) {
				this.curServServArr[12].push(inst);
			} else if (inst.service === SERVICE.VOTE) {
				this.curServServArr[13].push(inst);
			}
		}
	}
}