import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { SimpleInstance } from './00_data/interfaces'

import { DataService } from './data.service';

@Injectable({
	providedIn: 'root'
})
export class OnlineService {
	private arrOnline: number[] = [0, 0];
	private arrSimpleOnline: BehaviorSubject<number[]> = new BehaviorSubject<number[]>([0, 0]);
	
	protected simpleInstances: SimpleInstance[] = [];
	protected simpleInstancesSubject: BehaviorSubject<SimpleInstance[]> = new BehaviorSubject<SimpleInstance[]>([]);

	public listRunning: string[] = ['online', 'offline']

	constructor(private dataService: DataService) { }

	private getData(): void {
		this.simpleInstancesSubject = this.dataService.simpleInstancesSubject
		this.simpleInstances = this.simpleInstancesSubject.getValue()
	}

	public simpleResetCount(): BehaviorSubject<number[]> {
		/// Reset Container //
		this.arrOnline = [0, 0];
		///////////////////////
		this.getData();
		this.fillOnline();
		return this.arrSimpleOnline;
	}

	protected fillOnline(): void {
		for (const instance of this.simpleInstances) {
			if (instance.status === 'stopped') {
				this.arrOnline[1] = (Number(instance.instances_part) * 100);
			} else {
				this.arrOnline[0] += (Number(instance.instances_part) * 100);
			}
			
		}
		this.arrSimpleOnline.next(this.arrOnline)
	}

	public updateData(): void {
		this.getData()
		this.arrSimpleOnline.next(this.simpleResetCount().getValue());
	}
}
