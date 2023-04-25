import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { RealInstance } from '../00_data/interfaces';

import { WarnComponent } from '../warn/warn-dialog.component';

import { StatusService } from '../status.service';
import { FilterService } from '../filter.service';
import { WarnService } from '../warn.service';

@Component({
	selector: 'app-status-detail',
	templateUrl: './instance-detail.component.html',
	styleUrls: ['./instance-detail.component.css']
})
export class InstanceDetailComponent implements OnInit {
	////////// Header /////////////
	protected instancesObservable: Observable<RealInstance[]> | undefined;
	protected instanceNamenList: Observable<string[]> = new Observable<string[]>
	protected instanceNamen: FormControl<string | null> = new FormControl('');
	//////////////////////////////

	/** additional restart groups */
	protected InstanceGruppen: string[] = ["backEnd", "irgendeine Gruppe"];
	/** current instance name */
	private name = String(this.route.snapshot.paramMap.get('name'));

	constructor(
		private route: ActivatedRoute,
		private statusService: StatusService,
		private location: Location,
		private filterService: FilterService,
		private dialog: MatDialog,
		private warnService: WarnService
	) { }

	public ngOnInit(): void {
		this.instanceNamenList = this.filterService.reachableInstances().asObservable();
		this.statusService.realInstancesSubject.subscribe(() => {
			this.filterService.updateFilter();
		})
		this.initialise();
		this.route.url.subscribe(() => {
			this.name = String(this.route.snapshot.paramMap.get('name'));
			this.activateInstance()
			this.instancesObservable = this.statusService.currentInstancesSubject.asObservable();

		})
	}

	private initialise() {
		this.statusService.realInstancesSubject.subscribe(() => {
			this.activateInstance();
		})
	}
	
	/**
	 * get the name from the current instance
	 */
	private activateInstance(): void {
		this.statusService.getInst(this.name);
	}
	
	/**
	 * go to previous page
	 */
	protected goBack(): void {
		this.location.back();
	}

	protected openWarnDialog(str:string): void {
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
}

