import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { Instance, Status } from './00_data/interfaces';

import { StatusService } from './status.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class FilterService {
	private instances: Instance[] = [];
	private instancesSubject: BehaviorSubject<Instance[]> = new BehaviorSubject<Instance[]>([]);

	private possibleInstances: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([])
	private possibleServices: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([])
	private chosenInstances: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([])
	private chosenServices: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([])

	private loading = true
	private loaded = false

	constructor(
		private statusService: StatusService,
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
		this.possibleInstances.next(this.turnIntoArray(this.instances));
		for (const instance of this.instances) {
			this.possibleServices.next(this.turnIntoArray(instance.services));
			break;
		}
	}
	private getData(): void {
		this.instancesSubject = this.statusService.instancesSubject
		this.instances = this.instancesSubject.getValue()
		if(this.instances.length > 0) {
			this.loading = false
		}
	}
	/**
	 * activate all filter possibilities
	 */
	private setAllFilter(): void {
		if (!this.loading && !this.loaded) {
			this.loaded = true;
			this.chosenInstances.next(this.possibleInstances.getValue());
			this.chosenServices.next(this.possibleServices.getValue());
		}
	}
	// turn Array of Status or Instance into Arrays od string with only their names
	private turnIntoArray(list: (Status[] | Instance[])): string[] {
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
	 * @param instance 
	 * @returns the worst status from instance (error>slow>fast>offline)
	 */
	public whatStatus(instance: Instance): string {
		const status: string[] = ["offline", "error", "slow", "fast"];
		let id = 3;
		if (!instance.running) {
			id = 0;
		} else {
			instance.services.forEach(element => {
				if ("error" === element.status) {
					id = 1;
				}
				if ("slow" === element.status && id > 1) {
					id = 2;
				}
			});
		}
		return status[id];
	}
}