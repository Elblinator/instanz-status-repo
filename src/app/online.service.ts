import { Injectable } from '@angular/core';

import { Instance } from './00_data/interfaces'

import { StatusService } from './status.service';

@Injectable({
	providedIn: 'root'
})
export class OnlineService {
	instances: Instance[] = [];
	arrOnline: number[] = [0, 0];
	constructor(private statusService: StatusService) { }

	public getInstance(): void {
		this.statusService.getInstance()
			.subscribe(instances => { this.instances = instances });
	}
	/**
	 * count how many instances are runnning or not running
	 * @returns array first number is for running instances, second number is for stopped instances
	 */
	protected countOnline(): number[] {
		this.getInstance();
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
