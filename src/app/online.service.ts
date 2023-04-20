import { Injectable } from '@angular/core';

import { Instance } from './00_data/interfaces'

import { StatusService } from './status.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class OnlineService {
	private instances: Instance[] = [];
	private arrOnline: number[] = [0, 0];
	private instancesSubject: BehaviorSubject<Instance[]> = new BehaviorSubject<Instance[]>([]);
	constructor(private statusService: StatusService) { }

	private getData(): void {
		this.instancesSubject = this.statusService.instancesSubject
		this.instances = this.instancesSubject.getValue()
	}
	/**
	 * count how many instances are runnning or not running
	 * @returns array first number is for running instances, second number is for stopped instances
	 */
	protected countOnline(): number[] {
		this.getData();
		for (const instance of this.instances) {
			this.arrOnline[this.checkOnline(instance.running)] += 1
		}
		return this.arrOnline;
	}
	/**
	 * checkOnline returns the index for arrOnline 
	 * if instance is not running it counts at arrOnline[1]
	 * if instance is running it counts at arrOnline[0]	  
	 * @param running = boolean if and instance is runnning
	 * @returns index 0 if running and 1 if not running
	 */
	protected checkOnline(running: boolean): number {
		if (running) {
			return 0;
		} else {
			return 1;
		}
	}
	public resetCount(): number[] {
		this.arrOnline = [0, 0];
		this.countOnline();
		return this.arrOnline;
	}
}
