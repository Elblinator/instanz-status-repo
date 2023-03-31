import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import { Instance } from '../00_data/interfaces';

import { CheckStatusService } from '../check-status.service';
import { FilterService } from '../filter.service';
import { OnlineService } from '../online.service'
import { StatusService } from '../status.service';
import { UserService } from '../user.service';

@Component({
	selector: 'app-start',
	templateUrl: './start.component.html',
	styleUrls: ['./start.component.css']
})
export class StartComponent implements OnInit {
	instances: Instance[] = [];
	arrService: number[] = [0, 0, 0];
	arrOnline: number[] = [0, 0];
	instanceNamenList: string[] = this.filterService.reachableInstances();
	instanceNamen = new FormControl('');

	constructor(
		private statusService: StatusService,
		private userService: UserService,
		private onlineService: OnlineService,
		private checkStatusService: CheckStatusService,
		private filterService: FilterService
	) { }

	public ngOnInit(): void {
		this.getInstance();
		this.resetCount();
	}
	protected isLoggedIn(): boolean {
		return this.userService.isLoggedIn();
	}
	protected getInstance(): void {
		this.statusService.getInstance()
			.subscribe(instances => { this.instances = instances });
	}
	/**
	 * reset count for amount of stati (fast/slow/error) and
	 * reset count for amount of instances (running/stopped)
	 */
	protected resetCount(): void {
		this.arrService = this.checkStatusService.resetCount();
		this.arrOnline = this.onlineService.resetCount();
	}
}