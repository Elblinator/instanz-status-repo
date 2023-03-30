import { Injectable } from '@angular/core';

import { StatusService } from './status.service';
import { Instance, Status } from './00_data/interfaces';

@Injectable({
	providedIn: 'root'
})
export class CheckStatusService {
	instances: Instance[] = [];
	arrService: number[] = [0, 0, 0];

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
	protected countStati(): number[] {
		this.getInstance();
		for (const instance of this.instances) {
			if (instance.running == true) {
				this.countStatus(instance.services);
			}
		}
		return this.arrService;
	}
	protected countStatus(services: Status[]): void {
		for (const service of services) {
			this.arrService[this.checkStatus(service.status)] += 1
		}
	}
	protected checkStatus(status: string): number {
		//numbers correspond ot the indexes from the array (arr)
		// --> arr[0] describes the amount of online stati
		if (status == "online") {
			return 0;
		} else if (status == "slow") {
			return 1;
		} else {
			return 2;
		}
	}
}
