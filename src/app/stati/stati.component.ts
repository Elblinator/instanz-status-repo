import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { Instanz, InstanzService, Status } from '../00_data/instanzen';
import { StatusService } from '../status.service';
import { DialogComponent } from '../dialog/dialog.component';
import { FilterService } from '../filter.service';
import { FormControl } from '@angular/forms';


@Component({
	selector: 'app-stati',
	templateUrl: './stati.component.html',
	styleUrls: ['./stati.component.css']
})
export class StatiComponent implements OnInit {
	instanzen: Instanz[] = []
	stati: Status[] = [];
	curInstServ: InstanzService = { instanz: "", service: "", status: "" }
	instanzOffline: InstanzService[] = []
	instanzOnline: InstanzService[] = []
	instanzSlow: InstanzService[] = []
	instanzError: InstanzService[] = []
	instanzNamenList: string[] = this.filterService.reachableInstances()
	instanzNamen = new FormControl('')

	constructor(
		private statusService: StatusService,
		private filterService: FilterService,
		private dialog: MatDialog,
	) { }

	public ngOnInit(): void {
		this.getData()
		this.sortData()
	}
	private getData(): void {
		this.statusService.getData()
			.subscribe(instanzen => { this.instanzen = instanzen });
	}
	private sortData(): void {
		const array = this.statusService.sortData()
		this.instanzOffline = array[0]
		this.instanzError = array[1]
		this.instanzSlow = array[2]
		this.instanzOnline = array[3]
	}
	protected openDialog(): void {
		this.dialog.open(DialogComponent)
	}
	protected isActivated(str: string): boolean {
		return this.filterService.isActivated(str)
	}
}