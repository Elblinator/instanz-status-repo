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
		this.getPossibleInstStatus();
	}
	public getPossibleInstStatus(): void {
		this.statusService.getData()
			.subscribe(instances => { this.instances = instances; });
		this.possibleInstances = this.turnIntoArray(this.instances);
		for (const instance of this.instances) {
			this.possibleServices = this.turnIntoArray(instance.services);
			break;
		}
	}
	public setChosenONCE(): void {
		if (this.first) {
			this.first = false;
			this.chosenInstances = this.possibleInstances;
			this.chosenServices = this.possibleServices;
		}
	}
	private turnIntoArray(list: (Status[] | Instance[])): string[] {
		const arr: string[] = [];
		for (const name of list) {
			arr.push(name.name);
		}
		return arr;
	}
	public setFilter(toppings: FormGroup[]): void {
		this.chosenInstances = [];
		this.chosenServices = [];
		const tops: FormGroup = toppings[0];
		const ping: FormGroup = toppings[1];
		let mapped = Object.entries(tops.value);
		for (const map of mapped) {
			if (map[1]) {
				this.chosenInstances.push(map[0]);
			}
		}
		mapped = Object.entries(ping.value)
		for (const map of mapped) {
			if (map[1]) {
				this.chosenServices.push(map[0]);
			}
		}
	}
	public reachableInstances(): string[] {
		return this.possibleInstances;
	}
	public reachableService(): string[] {
		return this.possibleServices;
	}
	protected activatedInstances(): string[] {
		return this.chosenInstances;
	}
	protected activatedService(): string[] {
		return this.chosenServices;
	}
	public isActivated(str: string): boolean {
		if (this.chosenServices.includes(str) || this.chosenInstances.includes(str)) {
			return true;
		}
		return false;
	}
}