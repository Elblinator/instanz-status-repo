import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { SortStatusService } from '../sort-status.service';
import { SortOnlineService } from '../sort-online.service'
import { UserService } from '../user.service';
import { DataService } from '../data.service';

@Component({
	selector: 'app-start',
	templateUrl: './start.component.html',
	styleUrls: ['./start.component.css'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class StartComponent implements OnInit {
	protected listStatus: string[] = [];
	protected listRunning: string[] = [];

	protected arrSimpleService: Observable<number[]> = new Observable<number[]>
	protected arrSimpleOnline: Observable<number[]> = new Observable<number[]>

	constructor(
		private dataService: DataService,
		private userService: UserService,
		private sortOnlineService: SortOnlineService,
		private sortStatusService: SortStatusService
	) {	}

	public ngOnInit(): void {
		this.listStatus = this.sortStatusService.listStatus
		this.listRunning = this.sortOnlineService.listRunning
		this.arrSimpleService = this.sortStatusService.simpleResetCount() as Observable<number[]>;
		this.arrSimpleOnline = this.sortOnlineService.simpleResetCount() as Observable<number[]>;
		this.dataService.simpleInstancesSubject.subscribe(() => {
			this.simpleResetCount();
			this.updateData();
		})

		this.dataService.setTitle("Instanzen Übersicht");
	}

	protected isLoggedIn(): boolean {
		return this.userService.isLoggedIn();
	}

	/**
	 * reset count for amount of stati (fast/slow/error) and
	 * reset count for amount of instances (running/stopped)
	 */
	protected simpleResetCount() {
		this.arrSimpleService = this.sortStatusService.simpleResetCount() as Observable<number[]>;
		this.arrSimpleOnline = this.sortOnlineService.simpleResetCount() as Observable<number[]>;
	}

	protected updateData() {
		this.sortStatusService.updateData()
		this.sortOnlineService.updateData()
	}
}