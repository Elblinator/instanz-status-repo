import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';

import { CheckStatusService } from '../check-status.service';
import { FilterService } from '../filter.service';
import { OnlineService } from '../online.service'
import { StatusService } from '../status.service';
import { UserService } from '../user.service';
import { Instance } from '../00_data/interfaces';

@Component({
	selector: 'app-start',
	templateUrl: './start.component.html',
	styleUrls: ['./start.component.css'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class StartComponent implements OnInit {
	////////// Header /////////////
	protected instancesObservable: Observable<Instance[]> | undefined;
	protected instanceNamenList: Observable<string[]> = new Observable<string[]>
	protected instanceNamen: FormControl<string | null> = new FormControl('');
	//////////////////////////////
	protected arrService: number[] = [0, 0, 0];
	protected arrOnline: number[] = [0, 0];
	protected listStatus: string[] = ['fast', 'slow', 'error']
	protected listRunning: string[] = ['online', 'offline']

	constructor(
		private statusService: StatusService,
		private userService: UserService,
		private onlineService: OnlineService,
		private checkStatusService: CheckStatusService,
		private filterService: FilterService
	) { }

	public ngOnInit(): void {
		this.statusService.instancesSubject.subscribe(() => {
			this.resetCount();
		})
		this.instancesObservable = this.statusService.instancesSubject.asObservable();
		this.instanceNamenList = this.filterService.reachableInstances().asObservable();
		this.statusService.instancesSubject.subscribe(() => {
			this.filterService.updateFilter();
		})
	}

	protected isLoggedIn(): boolean {
		return this.userService.isLoggedIn();
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