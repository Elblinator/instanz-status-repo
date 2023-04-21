import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { SimpleInstance } from './00_data/interfaces';

import { DataService } from './data.service';
import { SortCategoryService } from './sort-category.service';

@Injectable({
	providedIn: 'root'
})
export class SortStatusService extends SortCategoryService {
	protected simpleInstances: SimpleInstance[] = [];
	protected simpleInstancesSubject: BehaviorSubject<SimpleInstance[]> = new BehaviorSubject<SimpleInstance[]>([]);

	protected arrService: number[] = [0, 0, 0];
	protected arrSimpleService: BehaviorSubject<number[]> = new BehaviorSubject<number[]>([0, 0, 0]);

	public listStatus: string[] = ['fast', 'slow', 'error'];

	constructor(public override dataService: DataService) { super(dataService) }

	public simpleResetCount(): BehaviorSubject<number[]> {
		/// Reset Container /////
		this.arrService = [0, 0, 0];
		///////////////////////////

		super.getData();
		this.fill();
		return this.arrSimpleService;
	}

	protected override fill(): void {
		for (const instance of this.instances) {
			if (instance.status === 'normal') {
				this.arrService[0] = (Number(instance.instances_part) * 100);
			} else if (instance.status === 'unknown') {
				this.arrService[1] = (Number(instance.instances_part) * 100);
			} else if (instance.status === 'error') {
				this.arrService[2] = (Number(instance.instances_part) * 100);
			}
		}
		this.arrSimpleService.next(this.arrService);
	}

	public updateData() {
		this.arrBehaviour.next(this.simpleResetCount().getValue());
	}
}
