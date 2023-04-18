import { ChangeDetectionStrategy, Component, NgZone, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { FormControl } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Observable, map, shareReplay } from 'rxjs';

import { FilterService } from './filter.service';
import { UserService } from './user.service';
import { StatusService } from './status.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
	userName: string = this.userService.user;
	password: string = this.userService.password;
	inputName = new FormControl('');
	inputPassword = new FormControl('');
	/////
	title = 'Instanzen';
	/////

	constructor(
		private userService: UserService,
		private filterService: FilterService,
		private breakpointObserver: BreakpointObserver,
		private statusService: StatusService,
		private translate: TranslateService,
		private ngZone: NgZone
	) {
		translate.addLangs(['en', 'de']);
		translate.setDefaultLang('de');
		translate.use('de');
		this.initiateFilterData()
	} 
	ngOnInit() {
		setInterval(() => {
		// this.statusService.updateData();
		console.log('I would update Data every 5 minutes')
		}, 300000)
	}
	isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
		.pipe(
			map(result => result.matches),
			shareReplay()
		);
	protected isLoggedIn(): boolean {
		return this.userService.isLoggedIn();
	}
	protected logout(): void {
		this.userService.logout();
	}
	/**
	 * activate all filter
	 * and save which is a possibilitiy for filtering (saved in FilterService)
	 */
	private initiateFilterData(): void {
		this.filterService.getAndSetPossibleFilter();
	}
	/**
	 * @returns true if inputName and inputPassword match an existing user
	 */
	protected checkLogin(): boolean {
		return this.userService.checkLogin(this.inputName.value, this.inputPassword.value);
	}
}