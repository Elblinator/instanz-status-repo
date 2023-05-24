import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { InstanceService, RealInstance, ServiceService } from './00_data/interfaces'

import { FilterService } from './filter.service';
import { SERVICE } from './00_data/magic_strings';



@Injectable({ providedIn: 'root' })
export class StatusService {
	/** filtered and to be sorted Data */
	private filteredInstancesSubject: BehaviorSubject<RealInstance[]> = new BehaviorSubject<RealInstance[]>([]);
	///////////////////////////////////////////////
	/**    array dependend on status: offline */
	public instancesSortSubject_offline: BehaviorSubject<InstanceService[]> = new BehaviorSubject<InstanceService[]>([]);
	/** 2D array dependend on service */
	public instances2D_fast: BehaviorSubject<ServiceService[][]> = new BehaviorSubject<ServiceService[][]>([]);
	/** 2D array dependend on service */
	public instances2D_slow: BehaviorSubject<ServiceService[][]> = new BehaviorSubject<ServiceService[][]>([]);
	/** 2D array dependend on service */
	public instances2D_error: BehaviorSubject<ServiceService[][]> = new BehaviorSubject<ServiceService[][]>([]);
	//////////////////////////////////////////////
	/** the length of each array in curInstServArr */
	public instancesAmount: number[] = [];
	/** the length of each array in curInstServArr as BehaviourSubject (to make observing possible)*/
	public instancesAmountSubj: BehaviorSubject<number[]> = new BehaviorSubject<number[]>([]);
	///////////////////////////////////////////////
	/** placeholder for current instance */
	private curServServ: ServiceService = { instance: "", service: "" };
	/** placeholder to fill arrays dependend on service */
	private curServServArr: ServiceService[][] = [];
	/** placeholder for current instance */
	private curInstServ: InstanceService = { instance: "", service: "", status: "" };
	/** placeholder to save the current instance dependend on their status*/
	private curInstServArr: InstanceService[][] = [];
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
		this.sortData();
		this.instancesSortSubject_offline.next(this.curInstServArr[2]);

		this.instancesAmount = [
			this.curInstServArr[0].length,
			this.curInstServArr[1].length,
			this.curInstServArr[2].length,
			this.curInstServArr[3].length
		]
		this.instancesAmountSubj.next(this.instancesAmount)
	}

	/**
	 * if an instance is not running it's pushed onto instanceOffline otherwise it's forwarded to sortStatus().
	 * @returns an Array with Arrays, the Arrays are filled dependend on their status
	 *  return value = [instanceOffline, instanceError, instanceSlow, instanceFast]
	 */
	private sortData(): InstanceService[][] {
		//empty the placeholder arr
		this.curInstServArr = [[], [], [], []]
		for (const instance of this.filteredInstancesSubject.getValue()) {
			if (instance.status === 'stopped') {
				this.curInstServ = { instance: instance.name, service: "", status: "offline" };
				this.curInstServArr[2].push(this.curInstServ);
			} else {
				this.sortStatus(instance);
			}
		}
		return this.curInstServArr;
	}

	/**
	 * only running instances are sorted here
	 * instance is pushed to it's corresponding array
	 * @param instance 
	 */
	private sortStatus(instance: RealInstance): void {
		for (const service of instance.services) {
			if (this.filterService.isActivated(service.name)) {
				this.curInstServ = { instance: instance.name, service: service.name, status: service.status };
				if (this.filterService.isRunningGreen(service.status)) {
					this.curInstServArr[3].push(this.curInstServ);
				}
				else if (this.filterService.isRunningYellow(service.status)) {
					this.curInstServArr[1].push(this.curInstServ);
				}
				else if (this.filterService.isRunningRed(service.status)) {
					this.curInstServArr[0].push(this.curInstServ);
				} else {
					console.log('No known usage for ', service.status)
				}
			}
		}
	}

	/**
	 * sort all three arrays (which are already sorted dependend on their status) 
	 * into 2D arrays dependend on their service
	 */
	private sortServices(): void {
		this.sortService(this.curInstServArr[3], this.instances2D_fast)
		this.sortService(this.curInstServArr[1], this.instances2D_slow)
		this.sortService(this.curInstServArr[0], this.instances2D_error)
	}

	/**
	 * @param arr is the arr which needs sorting
	 * @param goal is the 2D arr in which is being sorted into
	 */
	private sortService(arr: InstanceService[], goal: BehaviorSubject<ServiceService[][]>): void {
		// empty placeholer array
		this.curServServArr = [[], [], [], [], [], [], [], [], [], [], [], [], [], []];
		for (const instance of arr) {
			this.curServServ = { instance: instance.instance, service: instance.service };
			this.determineService(this.curServServ)
		}
		this.trimArr()
		goal.next(this.curServServArr)
	}

	/**
	 * fills the 2D array curServServArr dependend on the services
	 * @param inst 
	 */
	private determineService(inst: ServiceService): void {
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
			} else {
				console.log('I am a forgotten service: ', inst.service)
			}
		}
	}
	
	/**
	 * this function removes all empty arrays 
	 * every empty array would be presented as an empty tile ; aka. the tile would not vanish
	 */
	private trimArr(): void {
		const dummyArr: ServiceService[][] = []
		for (const instance of this.curServServArr) {
			if (instance.length > 0) {
				dummyArr.push(instance)
			}
		}
		this.curServServArr = dummyArr
	}
}