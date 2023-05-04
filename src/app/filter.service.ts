import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';

import { RealInstance, SimpleInstance, Status } from './00_data/interfaces';
import { BLACK, GREEN, RED, STATUS_LIST, YELLOW } from './00_data/magic_strings';

import { DataService } from './data.service';

export type BackgroundPossibilities = 'backgroundGreen' | 'backgroundRed' | 'backgroundYellow' | 'backgroundBlack' | 'backgroundWhite';

@Injectable({
	providedIn: 'root'
})
export class FilterService {
	private realInstances: RealInstance[] = [];
	private filteredInstances: RealInstance[] = [];
	private realInstancesSubject: BehaviorSubject<RealInstance[]> = new BehaviorSubject<RealInstance[]>([]);
	public filteredInstancesSubject: BehaviorSubject<RealInstance[]> = new BehaviorSubject<RealInstance[]>([]);
	public simpleInstancesSubject: BehaviorSubject<SimpleInstance[]> = new BehaviorSubject<SimpleInstance[]>([]);

	public comesFromService = false;

	private possibleInstances: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([])
	private possibleServices: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([])
	private chosenInstances: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([])
	private chosenServices: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([])

	/**last watched instance (see instance-detail) */
	public currentInstanceSubject: BehaviorSubject<(RealInstance[])> = new BehaviorSubject<RealInstance[]>([{ name: "", status: "", services: [{ name: "", status: "" }] }]);

	public emptyInstance: RealInstance = { name: "", status: "", services: [] }
	public currentInstance: RealInstance = { name: "", status: "", services: [{ name: "", status: "" }] }
	public worstStatusArr: BackgroundPossibilities[] = [];
	public worstStatusArrSubj: BehaviorSubject<BackgroundPossibilities[]> = new BehaviorSubject<BackgroundPossibilities[]>([]);

	private loading = true
	private loaded = false

	constructor(
		private dataService: DataService
	) {
		this.getAndSetPossibleFilter();
		this.updateFilter()
	}

	public updateFilter(): void {
		this.dataService.realInstancesSubject.subscribe(() => {
			this.setPossibleInstStatus();
			this.setAllFilter();
			this.filterInstances();
			this.setWorstStatusArr();
		})
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
		this.setData()

		this.possibleInstances.next(this.turnIntoString(this.realInstances));
		for (const instance of this.realInstances) {
			this.possibleServices.next(this.turnIntoString(instance.services));
			break;
		}
	}

	private setData(): void {
		this.realInstancesSubject = this.dataService.realInstancesSubject
		this.realInstances = this.realInstancesSubject.getValue()

		if (this.realInstances.length > 0) {
			this.loading = false
		}
	}

	public getData(): void {
		this.filteredInstancesSubject
	}

	/**
	 * activate all filter possibilities 
	 * only once and only after the data was loaded
	 */
	private setAllFilter(): void {
		if (!this.loading && !this.loaded) {
			this.loaded = true;

			this.chosenInstances.next(this.possibleInstances.getValue());
			this.chosenServices.next(this.possibleServices.getValue());
			this.filterInstances()
		}
	}

	/** -turn Array of Status or Instance into Arrays of string with only their names */
	private turnIntoString(list: (Status[] | RealInstance[])): string[] {
		const names: string[] = [];
		for (const name of list) {
			names.push(name.name);
		}
		return names;
	}
	/**
	 * reset chosenValues 
	 * get new chosenValues @param data 
	 * and set them (as this.chosenInstances and this.chosenServices)
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

		this.filterInstances();
	}

	/**
	 * @returns the instances which could be used
	 */
	public reachableInstances(): BehaviorSubject<string[]> {
		return this.possibleInstances;
	}

	/**
	 * @returns the services which could be used
	 */
	public reachableService(): BehaviorSubject<string[]> {
		return this.possibleServices;
	}

	/**
	 * @returns the instances which are being used
	 */
	public activatedInstances(): BehaviorSubject<string[]> {
		return this.chosenInstances;
	}

	/**
	 * @returns the services which are being used
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
	 * @param status 
	 * @returns if the current status is running return true
	 */
	public isRunningGreen(status: string): boolean {
		if (Object.values(GREEN).includes(status as GREEN)) {
			return true;
		}
		return false;
	}

	/**
	 * @param status 
	 * @returns if the current status is one of the equivalents of yellow return true
	 */
	public isRunningYellow(status: string): boolean {
		if (Object.values(YELLOW).includes(status as YELLOW)) {
			return true;
		}
		return false;
	}

	/**
	 * @param status 
	 * @returns if the current status is one of the equivalents of red return true
	 */
	public isRunningRed(status: string): boolean {
		if (Object.values(RED).includes(status as RED)) {
			return true;
		}
		return false;
	}
	/**
	 * @param status 
	 * @returns if the current status is one of the equivalents of red return true
	 */
	public isRunningOnline(status: string): boolean {
		if (Object.values(BLACK).includes(status as BLACK)) {
			return false;
		}
		return true;
	}
	public setWorstStatusArr(): void {
		this.worstStatusArr = []
		for (const instance of this.filteredInstances) {
			this.worstStatusArr.push(this.getBackground(instance))
		}

		this.worstStatusArrSubj.next(this.worstStatusArr)
	}
	/**
	 * @param instance 
	 * @returns the worst status from instance (error>slow>fast>offline)
	 */
	public getStatus(instance: RealInstance): string {
		const status: string[] = [STATUS_LIST.OFFLINE, STATUS_LIST.ERROR, STATUS_LIST.SLOW, STATUS_LIST.FAST];
		let id = 3;
		if (Object.values(BLACK).includes(instance.status as BLACK)) {
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
	}
	/**
	 * @param instance 
	 * @returns the worst status from instance (error>slow>fast>offline)
	 */
	public getBackground(instance: RealInstance): BackgroundPossibilities {
		const status: BackgroundPossibilities[] = ['backgroundBlack', 'backgroundRed', 'backgroundYellow', 'backgroundGreen', 'backgroundWhite'];
		//BackgroundPossibilities = 'backgroundGreen' | 'backgroundGreen' | 'backgroundGreen' | 'backgroundBlack' | 'backgroundWhite';
		let id = 4;
		if (Object.values(BLACK).includes(instance.status as BLACK)) {
			id = 0;
		} else {
			instance.services.forEach(element => {
				if (this.isRunningRed(element.status)) {
					id = 1;
				}
				if (this.isRunningYellow(element.status) && id > 1) {
					id = 2;
				}
				if (this.isRunningGreen(element.status) && id > 2) {
					id = 3;
				}
			});
		}
		return status[id];
	}
	/**
	 * fill filteredInstances and filteredInstancesSubject only with the (in the Filter activated) instances
	 */
	private filterInstances(): void {
		this.filteredInstances = []
		for (const instance of this.chosenInstances.getValue()) {
			this.setInst(instance)
			this.filteredInstances.push(this.currentInstance)
		}

		this.filteredInstancesSubject.next(this.filteredInstances)
	}

	public getFilterInst(): BehaviorSubject<RealInstance[]> {
		return this.filteredInstancesSubject
	}

	/**
	 * @param name = name from an instance
	 * saves the searched instance in this.currentInstanceSubject
	 */
	public setInst(name: string): void {
		const a = this.realInstancesSubject.getValue().find(h => h.name === name);
		if (!(typeof (a) === 'undefined')) {
			this.currentInstance = a;
		}
	}
	/**
	 * @param name = name from an instance
	 * saves the searched instance in this.currentInstanceSubject
	 */
	public setInstSubj(name: string): Observable<RealInstance[]> {
		const a = this.dataService.realInstancesSubject.getValue().find(h => h.name === name);
		if (!(typeof (a) === 'undefined')) {
			this.currentInstanceSubject.next([a]);
		}
		return this.currentInstanceSubject as Observable<RealInstance[]>;
	}
	/**
	 * @param name = name from an instance
	 * saves the searched instance in this.currentInstanceSubject
	 */
	public setInstEmpty(): void {
		this.currentInstance = this.emptyInstance;
	}

	public setComesFromService(boo: boolean): void {
		this.comesFromService = boo;
	}
}