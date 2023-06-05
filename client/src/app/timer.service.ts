import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { Counter, RealInstance, Timer } from './00_data/interfaces';

import { DataService } from './data.service';

@Injectable({
	providedIn: 'root'
})
export class TimerService {
	public counter: Counter = { min: 0, sec: 0 };

	public counterSubj: BehaviorSubject<Counter> = new BehaviorSubject<Counter>({ min: 0, sec: 0 });

	private dataTimers: Timer[] = [];
	private dataTimer: Timer = { key: '', time: { min: 0, sec: 0 }, running: false };
	public dataTimersArr: { name: string, objec: BehaviorSubject<Timer> }[] = [];
	public dataTimersSubj: BehaviorSubject<Timer> = new BehaviorSubject<Timer>({ key: '', time: { min: 0, sec: 0 }, running: false });

	constructor(
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
		this.dataTimers = [];
		this.dataService.realInstancesSubject.getValue().forEach(instance => {
			this.dataTimer = {
				key: instance.name,
				time: this.counter,
				running: false
			}
			this.dataTimers.push(this.dataTimer);			
			this.dataTimersArr.push({ name: this.dataTimer.key, objec: new BehaviorSubject<Timer>(this.dataTimer) });

			// instance.services.forEach(service => {
			// 	const timer_name = instance.name + service
			// 	this.dataTimers.push({
			// 		key: timer_name,
			// 		time: 0,
			//		running: false
			// 	})
			// })
		})
	}

	/** 
	 * this function puts the number of the tumer up and then has to count down until zero is reched
	 */
	public startTimer(instance: RealInstance) {
		let counter = { min: 0, sec: 10 }
		let timer = this.findTimer(instance);
		timer.time = counter
		this.counterSubj.next(this.counter)

		let intervalId = setInterval(() => {
			if (counter.sec - 1 == -1) {
				counter.min -= 1;
				counter.sec = 59;
			}
			else counter.sec -= 1
			if (counter.min <= 0 && counter.sec <= 0) {
				clearInterval(intervalId)
			};
			this.counterSubj.next(counter)
		}, 1000)

	}

	/**
	 * the timer from each instance is potentially different so we need to get a time dependend on the looked at instance
	 * @param instance 
	 * @returns 
	 */
	public getCounter(instance: RealInstance): Counter {
		const num = this.findTimer(instance);
		if (num === undefined) {
			console.log('we seem to have a problem, your counter does not exist');
			return { min: -1, sec: -1 };
		}
		return num.time
	}
	/**
	 * the timer from each instance is potentially different so we need to get a time dependend on the looked at instance
	 * @param instance 
	 * @returns 
	 */
	public getCounterSubj(instance: RealInstance): BehaviorSubject<Counter> {
		this.counterSubj.next(this.getCounter(instance))
		return this.counterSubj
	}

	public findTimer(instance: RealInstance|string): Timer {
		let num: Timer|undefined;
		let tim: Timer = { key: '', time: { min: -1, sec: -1 }, running: false }
		if (typeof(instance) === 'string') {
			const num = this.dataTimersArr.find(h => h.name === instance)?.objec.getValue();
			tim = { key: instance, time: { min: -1, sec: -1 }, running: false };

		} else {
			const num = this.dataTimersArr.find(h => h.name === instance.name)?.objec.getValue();
			tim = { key: instance.name, time: { min: -1, sec: -1 }, running: false };
		}
		if (num === undefined) {
			//console.log('we seem to have a problem, your ', instance.name, ' Timer does not exist');
			return tim;
		}
		return num;
	}
}
