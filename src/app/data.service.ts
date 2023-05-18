import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

import { RealInstance, SimpleInstance } from './00_data/interfaces'

@Injectable({ providedIn: 'root' })
export class DataService {
	/** url for data change that for yourself dependent on your data-folder */
	private real_url = 'http://docker-le.whale:8001/assets/data/status.json'
	private simple_url = 'http://docker-le.whale:8001/assets/data/simple-status.json'

	/** All Data */
	public realInstancesSubject: BehaviorSubject<RealInstance[]> = new BehaviorSubject<RealInstance[]>([]);
	public simpleInstancesSubject: BehaviorSubject<SimpleInstance[]> = new BehaviorSubject<SimpleInstance[]>([]);

	private titleBehav: BehaviorSubject<string> = new BehaviorSubject<string>("");

	constructor(
		private http: HttpClient,
	) { this.updateData() }


	/** 
	 * initialises the data at the beginning
	 * and updates the data every interval (see app.component ngOnInit())
	 */
	public updateData(): void {
		console.log('update Data');
		this.http.get<SimpleInstance[]>(this.simple_url).subscribe(instances => {
			this.simpleInstancesSubject.next(instances)
		});
		this.http.get<RealInstance[]>(this.real_url).subscribe(instances => {
			const list: RealInstance[] = []
			instances.forEach((instance) => {
				if (!(instance.status === 'unknown')) {
					list.push(instance)
				}
			})
			this.realInstancesSubject.next(list)
		});
	}

	public getData(): void {
		this.simpleInstancesSubject
		this.realInstancesSubject
	}

	public getTitleObs(): Observable<string> {
		return this.titleBehav as Observable<string>;
	}

	public setTitle(str: string): void {
		this.titleBehav.next(str)
	}
}
