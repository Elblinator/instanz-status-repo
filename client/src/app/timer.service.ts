import { Injectable } from '@angular/core';

import { Counter, RealInstance, Timer } from './00_data/interfaces';

import { FilterService } from './filter.service';
import { DataService } from './data.service';

@Injectable({
	providedIn: 'root'
})
export class TimerService {
	public counter: Counter = { min: 0, sec: 0 };
	private counters: Counter[] = [];

	private data_dict: Timer[] = [];

	constructor(private filterService: FilterService,
		private dataService: DataService
	) {
		this.dataService.realInstancesSubject.subscribe(() => {
			this.fillTimerIn()
		})
	}
	/**
	 * this function has to initially give every instance (and service) a timer which is zero
	 */
	public fillTimerIn() {
		this.data_dict = [];
		this.counters;
		this.filterService.realInstances.forEach(instance => {
			this.data_dict.push({
				key: instance,
				time: this.counter
			})
			// instance.services.forEach(service => {
			// 	const timer_name = instance.name + service
			// 	this.data_dict.push({
			// 		key: timer_name,
			// 		time: 0
			// 	})
			// })
		})
	}

	/** 
	 * this function puts the nummber of the tumer up and then has to count down until zero is reched
	 */
	public startTimer(instance: RealInstance) {
		instance
		this.counter = { min: 0, sec: 10 }
		let intervalId = setInterval(() => {
			if (this.counter.sec - 1 == -1) {
				this.counter.min -= 1;
				this.counter.sec = 59;
			}
			else this.counter.sec -= 1
			if (this.counter.min === 0 && this.counter.sec == 0) {clearInterval(intervalId)};
		}, 1000)
		console.log(intervalId)

	}

	/**
	 * the timer from each instance is potentially different so we need to get a time dependend on the looked at instance
	 * @param instance 
	 * @returns 
	 */
	public getTimer(instance: RealInstance): Counter {
		let num = this.data_dict.find(h => h.key === instance)
		if (num === undefined) {
			console.log('we seem to have a problem, your timer does not exist');
			return {min:-1, sec:-1};
		}
		return num.time
	}
}
