import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { FormControl } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Observable, map, shareReplay } from 'rxjs';

import { FilterService } from './filter.service';
import { UserService } from './user.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent {
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
		private translate: TranslateService
	) {
		translate.addLangs(['en', 'de']);
		translate.setDefaultLang('de');
		translate.use('de');
		this.initiateFilterData()
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