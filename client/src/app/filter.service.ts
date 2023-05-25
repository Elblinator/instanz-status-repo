import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';

import { Info, RealInstance, SimpleInstance, Status } from './00_data/interfaces';
import { BLACK, GREEN, RED, SERVICE, STATUS_LIST, YELLOW } from './00_data/magic_strings';

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
	public comesFromInstanzen = false;

	private possibleInstances: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);
	private possibleServices: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);
	private chosenInstances: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);
	private chosenServices: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);
	private dummy_chosenInstances: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);
	private dummy_chosenServices: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);
	public dummy_chosenInstancesString: string[] = [];

	/**last watched instance (see instance-detail) */
	public currentInstanceSubject: BehaviorSubject<(RealInstance)> = new BehaviorSubject<RealInstance>({ name: "", status: "", services: [{ name: "", status: "" }] });
	private actualCurrentInstance: RealInstance = { name: '', status: '', services: [{ name: '', status: '' }] };

	public emptyInstance: RealInstance = { name: "", status: "", services: [] };
	public currentInstance: RealInstance = { name: "", status: "", services: [{ name: "", status: "" }] };
	public worstStatusArr: BackgroundPossibilities[] = [];
	public worstStatusArrSubj: BehaviorSubject<BackgroundPossibilities[]> = new BehaviorSubject<BackgroundPossibilities[]>([]);

	private loading = true;
	private loaded = false;

	constructor(
		private dataService: DataService,
		private _formBuilder: FormBuilder
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

	public getFilterInst(): BehaviorSubject<RealInstance[]> {
		return this.filteredInstancesSubject
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
			this.dummy_chosenInstances.next(this.possibleInstances.getValue());
			this.dummy_chosenServices.next(this.possibleServices.getValue());
			this.dummy_chosenInstancesString = this.possibleInstances.getValue();
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
	 * set chosenValues 
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
	 * set Dummy_chosenValues 
	 * get new Dummy_chosenValues @param data 
	 * and set them (as this.Dummy_chosenInstances and this.Dummy_chosenServices)
	 */
	public setDummyFilter(data: FormGroup[]): void {
		const inst: FormGroup = data[0];
		const serv: FormGroup = data[1];
		let currentList: string[] = [];
		let mapped = Object.entries(inst.value);
		for (const map of mapped) {
			if (map[1]) {
				currentList.push(map[0]);
			}
		}
		this.dummy_chosenInstances.next(currentList);
		this.dummy_chosenInstancesString = currentList;


		currentList = []
		mapped = Object.entries(serv.value)
		for (const map of mapped) {
			if (map[1]) {
				currentList.push(map[0]);
			}
		}
		this.dummy_chosenServices.next(currentList);
	}
	/**
	 * activae/deavtivatet a whole status group 
	 * set new keep unrelated chosenValues @param data 
	 * and set the status group (as this.chosenInstances and this.chosenServices)
	 */
	public setDummyFilterBox(data: FormGroup[], boo: boolean, str: string): void {
		const inst: FormGroup = data[0];
		const mapped = Object.entries(inst.value);
		const currentList: string[] = [];
		let curInst = '';
		let a: (b: string) => boolean;
		if (this.isRunningOffline(str) || str === 'online') {
			a = this.isRunningOffline;
		} else if (this.isRunningGreen(str)) {
			a = this.isRunningGreen;
		} else if (this.isRunningYellow(str)) {
			a = this.isRunningYellow;
		} else {
			a = this.isRunningRed;
		}

		for (const map of mapped) {
			this.setInst(map[0])
			// dependend on on/off we need to look at a different status
			curInst = this.currentInstance.status;
			if (str === 'online') {
				if (a(curInst)) {
					if (map[1]) {
						currentList.push(map[0]);
					}
				} else {
					if (boo) {
						currentList.push(map[0]);
					}
				}

			} else {
				if (!this.isRunningOffline(str)) {
					curInst = this.getStatus(this.currentInstance)
				}
				if (a(str)) {
					if (!a(curInst)) {
						if (map[1]) {
							currentList.push(map[0]);
						}
					} else {
						if (boo) {
							currentList.push(map[0]);
						}
					}
				}
			}
		}
		this.dummy_chosenInstances.next(currentList);
		this.setDummyFilter([this._formBuilder.group(Object.fromEntries(this.reachableInstances().getValue().map(e => [e, this.isActivatedDummy(e)]))), data[1]]);
	}

	/**
	 * checks if all members of one status are gone 
	 * if online is initially true but then all members turn false online has to turn false to, and vise versa with iniitially false
	 */
	public checkDummyFilterBox(data: FormGroup[], boo: boolean, str: string): boolean {
		let counter = 0;
		const inst: FormGroup = data[0];
		const mapped = Object.entries(inst.value);
		let curInst = '';
		let a: (b: string) => boolean;
		if (this.isRunningOffline(str)) {
			a = this.isRunningOffline;
		} else if (this.isRunningGreen(str)) {
			a = this.isRunningGreen;
		} else if (this.isRunningYellow(str)) {
			a = this.isRunningYellow;
		} else {
			a = this.isRunningRed;
		}

		for (const map of mapped) {
			this.setInst(map[0])
			// dependend on on/off we need to look at a different status
			curInst = this.currentInstance.status;
			if (!this.isRunningOffline(str)) {
				curInst = this.getStatus(this.currentInstance)
			}
			if (a(curInst)) {
				if (boo === map[1]) {
					counter += 1;
				}
			}
		}
		if (counter === 0) {
			return !boo;
		}
		return boo;
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
		return this.dummy_chosenInstances;
	}
	/**
	 * @returns the services which are being used
	 */
	public activatedService(): BehaviorSubject<string[]> {
		return this.dummy_chosenServices;
	}

	/**
	 * @param instanceOrStatus 
	 * @returns if the current instance/service is activated (for the filter) then return true
	 */
	public isActivated(instanceOrStatus: string): boolean {
		return (this.chosenServices.getValue().includes(instanceOrStatus) || this.chosenInstances.getValue().includes(instanceOrStatus))
	}
	/**
	 * @param instanceOrStatus 
	 * @returns if the current instance/service is activated (for the filter) then return true
	 */
	public isActivatedDummy(instanceOrStatus: string): boolean {
		return (this.dummy_chosenServices.getValue().includes(instanceOrStatus) || this.dummy_chosenInstances.getValue().includes(instanceOrStatus))
	}

	/**
	 * @param status 
	 * @returns if the current status is running return true
	 */
	public isRunningGreen(status: string): boolean {
		return (Object.values(GREEN).includes(status as GREEN))
	}
	/**
	 * @param status 
	 * @returns if the current status is one of the equivalents of yellow return true
	 */
	public isRunningYellow(status: string): boolean {
		return (Object.values(YELLOW).includes(status as YELLOW))
	}
	/**
	 * @param status 
	 * @returns if the current status is one of the equivalents of red return true
	 */
	public isRunningRed(status: string): boolean {
		return (Object.values(RED).includes(status as RED))
	}
	/**
	 * @param status 
	 * @returns if the current status is one of the equivalents of red return true
	 */
	public isRunningOffline(status: string): boolean {
		return (Object.values(BLACK).includes(status as BLACK))
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
	public getStatusYellow(instance: RealInstance): boolean {
		let isYellow = false;
		instance.services.forEach(element => {
			if (this.isRunningYellow(element.status)) {
				isYellow = true;
			}
		});
		return isYellow;
	}
	/**
	 * @param instance 
	 * @returns the worst status from group (error>slow>fast>offline)
	 */
	public isEveryMemberValid(group: Info): boolean {
		let boo = true
		group.members.forEach(element => {
			if (!(Object.values(SERVICE).includes(element as SERVICE))) {
				boo = false;
			}
		});
		return boo;
	}

	public getGroupStatus(group: Info): string {
		const name = this.actualCurrentInstance.name;
		const status = this.actualCurrentInstance.status;
		const services: Status[] = [];
		const members = group.members;

		this.actualCurrentInstance.services.forEach(element => {
			if ((members.includes(element.name))) {
				services.push(element);
			}
		})
		return this.getStatus({ name, status, services })
	}

	/**
	 * @param instance 
	 * @returns the worst status from instance (error>slow>fast>offline)
	 */
	public getBackground(instance: RealInstance): BackgroundPossibilities {
		const status: BackgroundPossibilities[] = ['backgroundBlack', 'backgroundRed', 'backgroundYellow', 'backgroundGreen', 'backgroundWhite'];
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

	public getInst(): RealInstance {
		return this.currentInstance;
	}
	/**
	 * @param name = name from an instance
	 * saves the searched instance in this.currentInstanceSubject
	 */
	public setInstSubj(name: string): Observable<RealInstance> {
		const a = this.dataService.realInstancesSubject.getValue().find(h => h.name === name);
		if (!(typeof (a) === 'undefined')) {
			this.currentInstanceSubject.next(a);
			this.actualCurrentInstance = a;
		}
		return this.currentInstanceSubject as Observable<RealInstance>;
	}

	/**
	 * @param name = name from an instance
	 * saves the searched instance in this.currentInstanceSubject
	 */
	public setInstEmpty(): void {
		this.currentInstance = this.emptyInstance;
	}
	/**
	 * @param name = name from an instance
	 * saves the searched instance in this.currentInstanceSubject
	 */
	public setInstColour(colour: string): void {
		if (colour === "green") {
			this.currentInstance = { name: "", status: "", services: [{ name: "", status: "fast" }] };
		}
		else if (colour === "yellow") {
			this.currentInstance = { name: "", status: "", services: [{ name: "", status: "starting" }] };
		}
		else if (colour === "red") {
			this.currentInstance = { name: "", status: "", services: [{ name: "", status: "error" }] };
		}
		else {
			this.currentInstance = { name: "", status: "stopped", services: [{ name: "", status: "" }] };
		}
	}

	public setComesFromService(boo: boolean): void {
		this.comesFromService = boo;
	}
	public setComesFromInstanzen(boo: boolean): void {
		this.comesFromInstanzen = boo;
	}
}