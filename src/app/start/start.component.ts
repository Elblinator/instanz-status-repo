import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { CheckStatusService } from '../check-status.service';
import { OnlineService } from '../online.service'
import { StatusService } from '../status.service';
import { UserService } from '../user.service';

@Component({
	selector: 'app-start',
	templateUrl: './start.component.html',
	styleUrls: ['./start.component.css'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class StartComponent implements OnInit {
	protected listStatus: string[]
	protected listRunning: string[]

	protected arrSimpleService: Observable<number[]> = new Observable<number[]>
	protected arrSimpleOnline: Observable<number[]> = new Observable<number[]>

	constructor(
		private statusService: StatusService,
		private userService: UserService,
		private onlineService: OnlineService,
		private checkStatusService: CheckStatusService
	) { 
		this.listStatus = this.checkStatusService.listStatus
		this.listRunning = this.onlineService.listRunning
	}

	public ngOnInit(): void {
		this.arrSimpleService = this.checkStatusService.simpleResetCount().asObservable();
		this.arrSimpleOnline = this.onlineService.simpleResetCount().asObservable();
		this.statusService.simpleInstancesSubject.subscribe(() => {
			this.simpleResetCount();
			this.updateData();
		})
	
	}

	protected isLoggedIn(): boolean {
		return this.userService.isLoggedIn();
	}

	/**
	 * reset count for amount of stati (fast/slow/error) and
	 * reset count for amount of instances (running/stopped)
	 */
	protected simpleResetCount () {
		this.arrSimpleService = this.checkStatusService.simpleResetCount().asObservable();
		this.arrSimpleOnline = this.onlineService.simpleResetCount().asObservable()
	}

	protected updateData() {
		this.checkStatusService.updateData()
		this.onlineService.updateData()
	}
}