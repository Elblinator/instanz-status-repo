import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { Instance, InstanceService, Status } from './00_data/interfaces'
import { INSTANCE } from './00_data/mock-data-real'
import { FormControl } from '@angular/forms';


@Injectable({ providedIn: 'root' })
export class StatusService {
	////////DON'T FORGET/////////
	//private _url = 'http://docker-le.whale:8000/assets/data/example-data.json'


	instances: Instance[] = [];
	stati: Status[] = [];
	curInstServ: InstanceService = { instance: "", service: "", status: "" };
	instanceOffline: InstanceService[] = [];
	instanceOnline: InstanceService[] = [];
	instanceSlow: InstanceService[] = [];
	instanceError: InstanceService[] = [];
	instanceNamen = new FormControl('');

	constructor(
		private http: HttpClient,
	) { this.getDatas() }

	protected getDatas(): void {
		this.getData()
			.subscribe(instances => { this.instances = instances });
	}
	public updateData(): Observable<Instance[]> {
		//return this.http.get<Instance[]>(this._url)
		this.http;
		//this._url
		const instance = of(INSTANCE);
		return instance;
	}
	public getData(): Observable<Instance[]> {
		//return this.http.get<Instance[]>(this._url)
		this.http
		//this._url
		const instance = of(INSTANCE);
		return instance;
	}
	public getInstance(): Observable<Instance[]> {
		const instance = of(INSTANCE);
		return instance;
	}
	public getInst(name: string): Observable<Instance> {
		const instance = INSTANCE.find(h => h.name === name)!;
		return of(instance);
	}
	public sortData(): InstanceService[][] {
		this.instanceOffline = [];
		this.instanceError = [];
		this.instanceSlow = [];
		this.instanceOnline = [];
		for (const instance of this.instances) {
			if (!instance.running) {
				this.curInstServ = { instance: instance.name, service: "", status: "offline" };
				this.instanceOffline.push(this.curInstServ);
			} else {
				this.sortStatus(instance);
			}
		}
		return [this.instanceOffline, this.instanceError, this.instanceSlow, this.instanceOnline];
	}
	private sortStatus(instance: Instance): void {
		for (const service of instance.services) {
			this.curInstServ = { instance: instance.name, service: service.name, status: service.status };
			if (service.status == "online") {
				this.instanceOnline.push(this.curInstServ);
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