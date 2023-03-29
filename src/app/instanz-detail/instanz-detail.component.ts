import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Instanz } from '../00_data/instanzen';
import { StatusService } from '../status.service';
import { FormControl } from '@angular/forms';
import { FilterService } from '../filter.service';
import { MatDialog } from '@angular/material/dialog';
import { WarnComponent } from '../warn/warn.component';
import { WarnService } from '../warn.service';

@Component({
	selector: 'app-status-detail',
	templateUrl: './instanz-detail.component.html',
	styleUrls: ['./instanz-detail.component.css']
})
export class InstanzDetailComponent implements OnInit {
	instanzen: Instanz | undefined;
	instanzNamenList: string[] = this.filterService.reachableInstances()
	instanzNamen = new FormControl('')

	constructor(
		private route: ActivatedRoute,
		private statusService: StatusService,
		private location: Location,
		private filterService: FilterService,
		private dialog: MatDialog,
		private warnService: WarnService
	) { }

	public ngOnInit(): void {
		this.getName();
	}
	private getName(): void {
		const name = String(this.route.snapshot.paramMap.get('name'));
		this.statusService.getInst(name)
			.subscribe(instanz => this.instanzen = instanz);
	}
	protected goBack(): void {
		this.location.back();
	}
	protected openDia(str:string): void {
		this.warnService.setServiceAndMsg(str)
		this.dialog.open(WarnComponent)
	}
}

