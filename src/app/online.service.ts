import { Injectable } from '@angular/core';

import { Instanz } from './00_data/instanzen'
import { StatusService } from './status.service';

@Injectable({
	providedIn: 'root'
})
export class OnlineService {
	instanzen: Instanz[] = [];
	arrOnline: number[] = [0, 0];
	constructor(private statusService: StatusService) { }

	public getInstanz(): void {
		this.statusService.getInstanz()
			.subscribe(instanzen => { this.instanzen = instanzen });
	}
	protected countOnline(): number[] {
		this.getInstanz()
		for (const instanz of this.instanzen) {
			this.arrOnline[this.checkOnline(instanz.running)] += 1
		}
		return this.arrOnline
	}
	protected checkOnline(running: boolean): number {
		if (running == true) {
			return 0
		} else {
			return 1
		}
	}
	public resetCount(): number[] {
		this.arrOnline = [0, 0]
		this.countOnline()
		return this.arrOnline
	}
}
