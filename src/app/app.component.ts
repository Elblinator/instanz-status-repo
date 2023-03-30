import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { FormControl } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';

import { UserService } from './user.service';
import { FilterService } from './filter.service';
import { Observable, map, shareReplay } from 'rxjs';
import { User } from './00_data/interfaces';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent {
	userName: string = this.userService.user;
	password: string = this.userService.password;
	user: User[] = [];
	inputName = new FormControl('');
	inputPassword = new FormControl('');
	/////
	title = 'Instanzen';
	/////

	constructor(
		private userService: UserService,
		private filterService: FilterService,
		private breakpointObserver: BreakpointObserver,
		private translate: TranslateService) {
		translate.addLangs(['en', 'de']);
		translate.setDefaultLang('de');
		translate.use('de');
	}


	protected isLoggedIn(): boolean {
		return this.userService.isLoggedIn();
	}
	protected initiateFilterData(): boolean {
		this.filterService.getPossibleInstStatus();
		this.filterService.setChosenONCE();
		return true;
	}


	isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
		.pipe(
			map(result => result.matches),
			shareReplay()
		);
	protected logout(): void {
		this.userService.logout();
	}
	protected getUser(): void {
		this.user = this.userService.getUsers();
	}
	protected checkUser(): boolean {
		return this.userService.checkUser(this.inputName.value, this.inputPassword.value);
	}
}