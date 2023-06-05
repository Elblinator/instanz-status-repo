import { ChangeDetectionStrategy, ChangeDetectorRef, Component, NgZone } from '@angular/core';

import { TimerService } from '../timer.service';
import { WarnService } from '../warn.service';
import { FilterService } from '../filter.service';

@Component({
	selector: 'app-warn',
	templateUrl: './warn-dialog.component.html',
	styleUrls: ['./warn-dialog.component.css'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class WarnComponent {
	protected service = "";
	protected warn = "";
	protected hint = "";

	constructor(
		private warnService: WarnService,
		private ngZone: NgZone,
		private cd: ChangeDetectorRef,
		private timerService: TimerService,
		private filterService: FilterService
	) {
		[this.service, this.warn, this.hint] = this.warnService.getServiceAndMsg()
	}
	/**
	 * this function is supposed to restart this.service, 
	 * but I cannot write this function
	 * here take a dummy console.log
	 */
	protected warning(): void {
		console.log("I need a restart function");
		this.cd.markForCheck;
		this.timerService.startTimer(this.filterService.actualCurrentInstance)
		// restart this.service
	}
}
