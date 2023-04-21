import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { SimpleInstance} from './00_data/interfaces';

import { DataService } from './data.service';

@Injectable({
	providedIn: 'root'
})
export class CheckStatusService {
	protected simpleInstances: SimpleInstance[] = [];
	protected simpleInstancesSubject: BehaviorSubject<SimpleInstance[]> = new BehaviorSubject<SimpleInstance[]>([]);

	protected arrService: number[] = [0, 0, 0];
	protected arrSimpleService: BehaviorSubject<number[]> = new BehaviorSubject<number[]>([0, 0, 0]);

	public listStatus: string[] = ['fast', 'slow', 'error']

	constructor(private dataService: DataService) { }

	private getData(): void {
		this.simpleInstancesSubject = this.dataService.simpleInstancesSubject
		this.simpleInstances = this.simpleInstancesSubject.getValue()
	}


	public simpleResetCount(): BehaviorSubject<number[]> {
		/// Reset Container /////
		this.arrService = [0, 0, 0];
		///////////////////////////

		this.getData();
		this.fillStati();
		return this.arrSimpleService;
	}
	protected fillStati(): void {
		for (const instance of this.simpleInstances) {
			if (instance.status === 'normal') {
				this.arrService[0] = (Number(instance.instances_part) * 100);
			} else if (instance.status === 'unknown') {
				this.arrService[1] = (Number(instance.instances_part) * 100);
			} else if (instance.status === 'error') {
				this.arrService[2] = (Number(instance.instances_part) * 100);
			}
		}
		this.arrSimpleService.next(this.arrService)
	}

	public updateData() {
		this.getData()
		this.arrSimpleService.next(this.simpleResetCount().getValue());
	}
}
