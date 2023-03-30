import { Component } from '@angular/core';

import { WarnService } from '../warn.service';

@Component({
	selector: 'app-warn',
	templateUrl: './warn.component.html',
	styleUrls: ['./warn.component.css']
})
export class WarnComponent {
	service = ""
	warn = ""

	constructor(
		private warnService: WarnService
	) {
		[this.service, this.warn] = this.warnService.getServiceAndMsg()
	}
	protected warning() {
		console.log("I need a restart function")
		// restart(this.service)
	}
}
