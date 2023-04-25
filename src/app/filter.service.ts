import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';

import { RealInstance, Status } from './00_data/interfaces';

import { DataService } from './data.service';

@Injectable({
	providedIn: 'root'
})
export class FilterService {
	private instancesReal: RealInstance[] = [];
	private instancesSubjectReal: BehaviorSubject<RealInstance[]> = new BehaviorSubject<RealInstance[]>([]);

	private possibleInstances: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([])
	private possibleServices: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([])
	private chosenInstances: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([])
	private chosenServices: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([])

	private loading = true
	private loaded = false

	constructor(
		private dataService: DataService,
	) {
		this.getAndSetPossibleFilter();
	}

	public updateFilter(): void {
		this.setPossibleInstStatus();
		this.setAllFilter();
	}

	/**
	 * activate initially all possible Services and Instances for the filter 
	 */
	public getAndSetPossibleFilter(): void {
		this.setPossibleInstStatus();
		this.setAllFilter();
	}

	/**
	 * set all filter possibilities.
	 * possibilizies for instances are in this.possibleInstances.
	 * possibilizies for services are in this.possibleServices.
	 */
	public setPossibleInstStatus(): void {
		this.getData()

		this.possibleInstances.next(this.turnIntoString(this.instancesReal));
		for (const instance of this.instancesReal) {
			this.possibleServices.next(this.turnIntoString(instance.services));
			break;
		}
	}

	private getData(): void {
		this.instancesSubjectReal = this.dataService.realInstancesSubject
		this.instancesReal = this.instancesSubjectReal.getValue()
		
		if(this.instancesReal.length > 0) {
			this.loading = false
		}
	}
	/**
	 * activate all filter possibilities
	 */
	private setAllFilter(): void {
		console.log('loading', this.loading)
		console.log('loaded', this.loaded)
		if (!this.loading && !this.loaded) {
			this.loaded = true;

			this.chosenInstances.next(this.possibleInstances.getValue());
			this.chosenServices.next(this.possibleServices.getValue());
		}
	}

	/** -turn Array of Status or Instance into Arrays of string with only their names */
	private turnIntoString(list: (Status[] | RealInstance [])): string[] {
		const arr: string[] = [];
		for (const name of list) {
			arr.push(name.name);
		}
		return arr;
	}
	/**
	 * reset chosenValues 
	 * get new chosenValues @param data 
	 * and set them (as this.chosenInstances amd this.chosenServices)
	 */
	public setFilter(data: FormGroup[]): void {
		const inst: FormGroup = data[0];
		const serv: FormGroup = data[1];
		let currentList: string[] = [];
		let mapped = Object.entries(inst.value);
		for (const map of mapped) {
			if (map[1]) {
				currentList.push(map[0]);
			}
		}
		this.chosenInstances.next(currentList);

		currentList = []
		mapped = Object.entries(serv.value)
		for (const map of mapped) {
			if (map[1]) {
				currentList.push(map[0]);
			}
		}
		this.chosenServices.next(currentList);
	}
	/**
	 * @returns the Instances which  could be used
	 */
	public reachableInstances(): BehaviorSubject<string[]> {
		return this.possibleInstances;
	}
	/**
	 * @returns the Services which could be used
	 */
	public reachableService(): BehaviorSubject<string[]> {
		return this.possibleServices;
	}
	/**
	 * @returns the Instances which are used
	 */
	public activatedInstances(): BehaviorSubject<string[]> {
		return this.chosenInstances;
	}
	/**
	 * @returns the Services which are used
	 */
	public activatedService(): BehaviorSubject<string[]> {
		return this.chosenServices;
	}
	/**
	 * @param instanceOrStatus 
	 * @returns if the current instance/service is activated (for the filter) then return true
	 */
	public isActivated(instanceOrStatus: string): boolean {
		if (this.chosenServices.getValue().includes(instanceOrStatus) || this.chosenInstances.getValue().includes(instanceOrStatus)) {
			return true;
		}

		return false;
	}
	/**
	 * @param instanceOrStatus 
	 * @returns if the current instance/service is activated (for the filter) then return true
	 */
	public isActivatedReal(instanceOrStatus: string): boolean {
		if (this.chosenServices.getValue().includes(instanceOrStatus) || this.chosenInstances.getValue().includes(instanceOrStatus)) {
			return true;
		}
		return false;
	}
	/**
	 * @param instanceOrStatus 
	 * @returns if the current instance/service is activated (for the filter) then return true
	 */
	public isActivatedService(status: string): boolean {
		if (this.chosenServices.getValue().includes(status)) {
			return true;
		}
		return false;
	}

	/**
	 * @param status 
	 * @returns if the current status is running return true
	 */
	public isRunningGreen(status: string): boolean {
		if (status === 'running') {
			return true;
		}
		return false;
	}

	/**
	 * @param status 
	 * @returns if the current status is one of the equivalents of yellow return true
	 */
	public isRunningYellow(status: string): boolean {
		if (status === 'new' ||
			status === 'pending' ||
			status === 'assigned' ||
			status === 'accepted' ||
			status === 'ready' ||
			status === 'preparing' ||
			status === 'starting') {
			return true;
		}
		return false;
	}

	/**
	 * @param status 
	 * @returns if the current status is one of the equivalents of red return true
	 */
	public isRunningRed(status: string): boolean {
		if (status === 'complete' ||
			status === 'failed' ||
			status === 'shutdown' ||
			status === 'rejected' ||
			status === 'orphaned' ||
			status === 'remove') {
			return true;
		}
		return false;
	}

	/**
	 * @param instance 
	 * @returns the worst status from instance (error>slow>fast>offline)
	 */
	public whatStatusReal(instance: RealInstance): string {
		const status: string[] = ["offline", "error", "slow", "fast"];
		let id = 3;
		if (instance.status === 'stopped') {
			id = 0;
		} else {
			instance.services.forEach(element => {
				if (this.isRunningRed(element.status)) {
					id = 1;
				}
				if (this.isRunningYellow(element.status) && id > 1) {
					id = 2;
				}
			});
		}
		return status[id];
	}/**
	 * @param instance 
	 * @returns the worst status from instance (error>slow>fast>offline)
	 */
	public whatStatus(instance: RealInstance): string {
		const status: string[] = ["offline", "error", "slow", "running"];
		let id = 3;
		if (instance.status === 'stopped') {
			id = 0;
		} else {
			instance.services.forEach(element => {
				if ("error" === element.status) {
					id = 1;
				}
				if (("starting" === element.status || "unknown" === element.status) && id > 1) {
					id = 2;
				}
			});
		}
		return status[id];
	}
}