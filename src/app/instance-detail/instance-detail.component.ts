import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Instance } from '../00_data/interfaces';
import { StatusService } from '../status.service';
import { FormControl } from '@angular/forms';
import { FilterService } from '../filter.service';
import { MatDialog } from '@angular/material/dialog';
import { WarnComponent } from '../warn/warn-dialog.component';
import { WarnService } from '../warn.service';

@Component({
	selector: 'app-status-detail',
	templateUrl: './instance-detail.component.html',
	styleUrls: ['./instance-detail.component.css'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class InstanceDetailComponent implements OnInit {
	instances: Instance | undefined; 
	instanceNamenList: string[] = this.filterService.reachableInstances();
	instanceNamen = new FormControl('');
	InstanceGruppen: string[] = ["backend", "irgendeine Gruppe"];

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
	/**
	 * get the name from the current instance
	 */
	private getName(): void {
		const name = String(this.route.snapshot.paramMap.get('name'));
		this.statusService.getInst(name)
			.subscribe(instance => this.instances = instance);
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
}

