import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { SimpleInstance } from './00_data/interfaces';
import { GREEN, ONLINE_LIST, RED, YELLOW } from './00_data/magic_strings';

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

	public listStatus: string[] = Object.values(ONLINE_LIST);

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
			if (Object.values(GREEN).includes(instance.status as GREEN)) {
				this.arrService[0] = (Number(instance.instances_part) * 100);
			} else if (Object.values(YELLOW).includes(instance.status as YELLOW)) {
				this.arrService[1] = (Number(instance.instances_part) * 100);
			} else if (Object.values(RED).includes(instance.status as RED)) {
				this.arrService[2] = (Number(instance.instances_part) * 100);
			}
		}
		this.arrSimpleService.next(this.arrService);
	}

	public updateData() {
		this.arrBehaviour.next(this.simpleResetCount().getValue());
	}
}
