import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

import { UserService } from './user.service';
import { FilterService } from './filter.service';
import { Observable, map, shareReplay } from 'rxjs';
import { User } from './00_data/user';
import { FormControl } from '@angular/forms';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent {
	userName: string = this.userService.user
	password: string = this.userService.password
	user: User[] = []
	inputName = new FormControl('');
	inputPassword = new FormControl('');

	constructor(
		private userService: UserService,
		private filterService: FilterService,
		private breakpointObserver: BreakpointObserver
	) { }

	protected isLoggedIn(): boolean {
		return this.userService.isLoggedIn()
	}
	protected initiateFilterData(): boolean {
		this.filterService.getPossibleInstStatus()
		this.filterService.setChosenONCE()
		return true
	}
	title = 'Instanzen';

	isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
		.pipe(
			map(result => result.matches),
			shareReplay()
		);
	protected logout(): void {
		this.userService.logout()
	}
	protected getUser(): void {
		this.user = this.userService.getUsers()
	}
	protected checkUser(): boolean {
		return this.userService.checkUser(this.inputName.value, this.inputPassword.value)
	}
	
}