import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormControl } from '@angular/forms';
import { Observable, of } from 'rxjs';

import {
	Instance,
	InstanceService,
	Status
} from './00_data/interfaces'
import { INSTANCE } from './00_data/mock-data-real'



@Injectable({ providedIn: 'root' })
export class StatusService {
	private _url = 'http://docker-le.whale:8000/assets/data/example-data.json'

	instances: Instance[] = [];
	stati: Status[] = [];
	curInstServ: InstanceService = { instance: "", service: "", status: "" };
	instanceOffline: InstanceService[] = [];
	instanceFast: InstanceService[] = [];
	instanceSlow: InstanceService[] = [];
	instanceError: InstanceService[] = [];
	instanceNamen = new FormControl('');

	constructor(
		private http: HttpClient,
	) { this.getDatas() }
	//turn obervable Instance[] into Instance[]
	protected getDatas(): void {
		this.getInstance()
			.subscribe(instances => { this.instances = instances });
	}
	/** missing function which calls http
	 *  and function which calls loaded data, needs to be called differently
	 * updateData will be the function which calls http in a set timeinterval
	 * getData will distribute the loaded data into website
	 * 
	 */

	public updateData(): Observable<Instance[]> {
		//return this.http.get<Instance[]>(this._url)
		this.http;
		//this._url
		const instance = of(INSTANCE);
		return instance;
	}
	/** 
	*  @returns (preloaded) data as obeservable Instance[]
	*/
	public getInstance(): Observable<Instance[]> {
		const instance = of(INSTANCE);
		return instance;
	}
	/**
	 * @param name = name from an instance
	 * @returns = the complete instance
	 */
	public getInst(name: string): Observable<Instance> {
		const instance = INSTANCE.find(h => h.name === name)!;
		return of(instance);
	}
	/**
	 * if an instance is not running it's pushed onto instanceOffline otherwise it's forwarded to sortStatus().
	 * @returns an Array with Arrays, the Arrays are filled dependend on their status
	 *  return value = [instanceOffline, instanceError, instanceSlow, instanceFast]
	 */
	public sortData(): InstanceService[][] {
		this.instanceOffline = [];
		this.instanceError = [];
		this.instanceSlow = [];
		this.instanceFast = [];
		for (const instance of this.instances) {
			if (!instance.running) {
				this.curInstServ = { instance: instance.name, service: "", status: "offline" };
				this.instanceOffline.push(this.curInstServ);
			} else {
				this.sortStatus(instance);
			}
		}
		return [this.instanceOffline, this.instanceError, this.instanceSlow, this.instanceFast];
	}
	/**
	 * olny running instances are sorted here
	 * instance is pushed to it's corresponding array
	 * @param instance 
	 */
	private sortStatus(instance: Instance): void {
		for (const service of instance.services) {
			this.curInstServ = { instance: instance.name, service: service.name, status: service.status };
			if (service.status == "fast") {
				this.instanceFast.push(this.curInstServ);
			}
			else if (service.status == "slow") {
				this.instanceSlow.push(this.curInstServ);
			}
			else if (service.status == "error") {
				this.instanceError.push(this.curInstServ);
			}
		}
	}
}