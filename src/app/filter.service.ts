import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { StatusService } from './status.service';
import { Instance, Status } from './00_data/interfaces';
@Injectable({
	providedIn: 'root'
})
export class FilterService {
	instances: Instance[] = [];

	possibleInstances: string[] = [];
	possibleServices: string[] = [];

	chosenInstances: string[] = [];
	chosenServices: string[] = [];

	first = true

	constructor(
		private statusService: StatusService,
	) { }
	protected OnInit(): void {
		this.setPossibleInstStatus();
	}
	public setPossibleInstStatus(): void {
		this.statusService.getInstance()
			.subscribe(instances => { this.instances = instances; });
		this.possibleInstances = this.turnIntoArray(this.instances);
		for (const instance of this.instances) {
			this.possibleServices = this.turnIntoArray(instance.services);
			break;
		}
	}
	/**
	 * activate initially all possible Services and Instances for the filter 
	 */
	public setChosenONCE(): void {
		if (this.first) {
			this.first = false;
			this.chosenInstances = this.possibleInstances;
			this.chosenServices = this.possibleServices;
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
		this.chosenInstances = [];
		this.chosenServices = [];
		const inst: FormGroup = data[0];
		const serv: FormGroup = data[1];
		let mapped = Object.entries(inst.value);
		for (const map of mapped) {
			if (map[1]) {
				this.chosenInstances.push(map[0]);
			}
		}
		mapped = Object.entries(serv.value)
		for (const map of mapped) {
			if (map[1]) {
				this.chosenServices.push(map[0]);
			}
		}
	}
	// 'reachable' could also be 'possible', the this variable is already in use
	public reachableInstances(): string[] {
		return this.possibleInstances;
	}
	// 'reachable' could also be 'possible', the this variable is already in use
	public reachableService(): string[] {
		return this.possibleServices;
	}
	protected activatedInstances(): string[] {
		return this.chosenInstances;
	}
	protected activatedService(): string[] {
		return this.chosenServices;
	}
	/**
	 * @param str 
	 * @returns if the current instance/service is activated (for the filter) then return true
	 */
	public isActivated(str: string): boolean {
		if (this.chosenServices.includes(str) || this.chosenInstances.includes(str)) {
			return true;
		}
		return false;
	}
}