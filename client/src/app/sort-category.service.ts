import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { SimpleInstance } from './00_data/interfaces';

import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export abstract class SortCategoryService {
	protected arr: number[] = [];
	protected arrBehaviour: BehaviorSubject<number[]> = new BehaviorSubject<number[]>([0, 0]);
	
	protected instances: SimpleInstance[] = [];
	protected instancesSubject: BehaviorSubject<SimpleInstance[]> = new BehaviorSubject<SimpleInstance[]>([]);

  constructor(public dataService: DataService) { 
  }
  
  protected getData(): SimpleInstance[] {
		this.instancesSubject = this.dataService.simpleInstancesSubject;
		this.instances = this.instancesSubject.getValue();
    return this.instances;
	}

  protected abstract fill(arr:number[]): void;

}
