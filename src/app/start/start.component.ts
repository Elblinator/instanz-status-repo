import { Component, OnInit } from '@angular/core';

import { Instance } from '../00_data/interfaces';
import { StatusService } from '../status.service';
import { UserService } from '../user.service';
import { OnlineService } from '../online.service'
import { CheckStatusService } from '../check-status.service';
import { FormControl } from '@angular/forms';
import { FilterService } from '../filter.service';

@Component({
	selector: 'app-start',
	templateUrl: './start.component.html',
	styleUrls: ['./start.component.css']
})
export class StartComponent implements OnInit {
	instances: Instance[] = [];
	arrService: number[] = [0, 0, 0];
	arrOnline: number[] = [0, 0];
	userName: string = this.userService.user;
	password: string = this.userService.password;
	first = true;
	instanceNamenList: string[] = this.filterService.reachableInstances();
	instanceNamen = new FormControl('');
	curNumber = 0;

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

	protected getInstance(): void {
		this.statusService.getInstance()
			.subscribe(instances => { this.instances = instances });
	}
	protected resetCount(): void {
		this.arrService = this.checkStatusService.resetCount();
		this.arrOnline = this.onlineService.resetCount();
	}
	protected isLoggedIn(): boolean {
		return this.userService.isLoggedIn();
	}
}