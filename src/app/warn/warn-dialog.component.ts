import { ChangeDetectionStrategy, ChangeDetectorRef, Component, NgZone } from '@angular/core';

import { WarnService } from '../warn.service';

@Component({
	selector: 'app-warn',
	templateUrl: './warn-dialog.component.html',
	styleUrls: ['./warn-dialog.component.css'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class WarnComponent {
	service = "";
	warn = "";

	constructor(
		private warnService: WarnService,
		private ngZone: NgZone,
		private cd: ChangeDetectorRef
	) {
		[this.service, this.warn] = this.warnService.getServiceAndMsg()
	}
	/**
	 * this function is supposed to restart this.service, 
	 * but I cannot write this function
	 * here take a dummy console.log
	 */
	protected warning(): void {
		console.log("I need a restart function");
		this.cd.markForCheck;
		// restart this.service
	}
}
