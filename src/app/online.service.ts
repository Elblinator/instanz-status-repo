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
	protected countOnline(): number[] {
		this.getInstance();
		for (const instance of this.instances) {
			this.arrOnline[this.checkOnline(instance.running)] += 1
		}
		return this.arrOnline;
	}
	protected checkOnline(running: boolean): number {
		if (running == true) {
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
