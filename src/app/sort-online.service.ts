import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { SimpleInstance } from './00_data/interfaces';

import { DataService } from './data.service';
import { SortCategoryService } from './sort-category.service';

@Injectable({
	providedIn: 'root'
})
export class SortOnlineService extends SortCategoryService {
	private arrOnline: number[] = [0, 0];
	private arrSimpleOnline: BehaviorSubject<number[]> = new BehaviorSubject<number[]>([0, 0]);
	
	protected simpleInstances: SimpleInstance[] = [];
	protected simpleInstancesSubject: BehaviorSubject<SimpleInstance[]> = new BehaviorSubject<SimpleInstance[]>([]);

	public listRunning: string[] = ['online', 'offline'];

	constructor(public override dataService: DataService) { super(dataService) }

	public simpleResetCount(): BehaviorSubject<number[]> {
		/// Reset Container //
		this.arrOnline = [0, 0];
		///////////////////////
		super.getData();
		this.fill();
		return this.arrSimpleOnline;
	}
	protected override fill(): void {
		for (const instance of this.instances) {
			if (instance.status === 'stopped') {
				this.arrOnline[1] = (Number(instance.instances_part) * 100);
			} else {
				this.arrOnline[0] += (Number(instance.instances_part) * 100);
			}	
		}
		this.arrSimpleOnline.next(this.arrOnline);
	}

	public updateData(): void {
		this.arrBehaviour.next(this.simpleResetCount().getValue());
	}
}
