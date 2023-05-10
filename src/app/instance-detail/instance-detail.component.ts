import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { RealInstance } from '../00_data/interfaces';

import { WarnComponent } from '../warn/warn-dialog.component';

import { FilterService } from '../filter.service';
import { WarnService } from '../warn.service';
import { DataService } from '../data.service';

@Component({
	selector: 'app-status-detail',
	templateUrl: './instance-detail.component.html',
	styleUrls: ['./instance-detail.component.css']
})
export class InstanceDetailComponent implements OnInit {
	protected instancesObservable: Observable<RealInstance[]> | undefined;

	/** additional restart groups */
	protected InstanceGruppen: string[] = ["backEnd", "irgendeine Gruppe"];
	/** current instance name */
	private name = String(this.route.snapshot.paramMap.get('name'));

	constructor(
		private route: ActivatedRoute,
		private location: Location,
		private filterService: FilterService,
		private dialog: MatDialog,
		private warnService: WarnService,
		private dataService: DataService
	) { }

	public ngOnInit(): void {

		this.initialise();
		this.route.url.subscribe(() => {
			this.activateInstance()
		})
	}

	private initialise() {
		this.dataService.realInstancesSubject.subscribe(() => {
			this.activateInstance();
		})
	}

	/**
	 * set the current instance
	 */
	private activateInstance(): void {
		this.name = String(this.route.snapshot.paramMap.get('name'));
		this.instancesObservable = this.filterService.setInstSubj(this.name);		
	}

	/**
	 * go to previous page
	 */
	protected goBack(): void {
		this.location.back();
	}

	protected openWarnDialog(str: string): void {
		this.warnService.setServiceAndMsg(str);
		this.dialog.open(WarnComponent);
	}

	protected isRunningGreen(status: string): boolean {
		return this.filterService.isRunningGreen(status);
	}
	protected isRunningYellow(status: string): boolean {
		return this.filterService.isRunningYellow(status);
	}
	protected isRunningRed(status: string): boolean {
		return this.filterService.isRunningRed(status);
	}
	protected isRunningOffline(status: string): boolean {
		return this.filterService.isRunningOffline(status);
	}
}

