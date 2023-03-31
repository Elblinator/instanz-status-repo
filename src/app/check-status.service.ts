import { Injectable } from '@angular/core';

import { Instance, Status } from './00_data/interfaces';

import { StatusService } from './status.service';

@Injectable({
	providedIn: 'root'
})
export class CheckStatusService {
	instances: Instance[] = [];
	arrService: number[] = [0, 0, 0];
	listStatus: string[] = ['fast', 'slow', 'error']

	constructor(private statusService: StatusService) { }

	private getInstance(): void {
		this.statusService.getInstance()
			.subscribe(instances => { this.instances = instances });
	}
	public resetCount(): number[] {
		this.arrService = [0, 0, 0];
		this.countStati();
		return this.arrService;
	}
	/**
	 * countStati goes through each instance, verifies that the instance is running
	 * and then calls countStatus to count up the stati in this running instance
	 * @returns number[] with three entries,
	 *  	number[0] corresponds to amount of stati which are fast
	 *  	number[1] corresponds to amount of stati which are slow
	 *  	number[2] corresponds to amount of stati which are error
	 */
	protected countStati(): number[] {
		this.getInstance();
		for (const instance of this.instances) {
			if (instance.running) {
				this.countStatus(instance.services);
			}
		}
		return this.arrService;
	}
	/**
	 * count the status from every service from one instance => 
	 * this.arrService is a number[] with three items
	 * there are three different stati (fast/slow/error)
	 * checkStatus gives back the correct index for the status
	 * and then adds one up for this status
	 * @param services = all services from one instance
	 */
	protected countStatus(services: Status[]): void {
		for (const service of services) {
			this.arrService[this.checkStatus(service.status)] += 1
		}
	}
	/**
	 * @param status = status from one service
	 * @returns the corresponding index for the status => fast has 0, slow has 1, error has 2
	 */
	protected checkStatus(status: string): number {
		//numbers correspond ot the indexes from the array (arr)
		// --> arr[0] describes the amount of fast stati
		if (status == "fast") {
			return 0;
		} else if (status == "slow") {
			return 1;
		} else {
			return 2;
		}
	}
}
