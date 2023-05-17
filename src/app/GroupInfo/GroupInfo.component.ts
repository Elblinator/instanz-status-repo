import { ChangeDetectionStrategy, Component, NgZone } from '@angular/core';

import { WarnService } from '../warn.service';

@Component({
  selector: 'app-group-info',
  templateUrl: './GroupInfo.component.html',
  styleUrls: ['./GroupInfo.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GroupInfoComponent {
	group = "";
	members: string[] = []

	constructor(
		private warnService: WarnService,
		private ngZone: NgZone,
	) {
		[this.group, this.members] = this.warnService.getInfo()
	}
}