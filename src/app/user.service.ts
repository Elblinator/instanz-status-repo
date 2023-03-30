import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { User } from './00_data/user';
import { USER } from './00_data/mock-user';

@Injectable({
	providedIn: 'root'
})
export class UserService {
	users: User[] = []
	user = ""
	password = ""
	isUser = false
	isTesting: boolean = true
	isTestingOnline: boolean = true

	constructor () {
		if (this.isTesting) {
			this.isUser = this.isTestingOnline
		}
	 }

	protected login(user: string, password: string): void {
		this.user = user
		this.password = password
		this.isUser = true
	}
	public logout(): void {
		this.user = ""
		this.password = ""
		this.isUser = false
	}
	public checkUser(user: (string | null), password: (string | null)): boolean {
		let id = -1
		this.getUsers()
		if (typeof (user) === "string" && typeof (password) === "string") {
			// if user and password are in the same column in this.getUser() then login() and return true
			this.users.forEach(element => {
				if (element.user == user) {
					id = element.id
				}
			})
			if (id > -1 && this.users[id].password == password) {
				this.login(user, password)
			} else {
				this.isUser = false 
			}
		}
		//////////Testing Interception////////////
		if (this.isTesting) {
			this.isUser = this.isTestingOnline
		}
		//////////////////////////////////////////

		// actual return value
		return this.isUser
	}
	private getUser(): Observable<User[]> {
		//return this.http.get<Instanz[]>(this._url)
		const user = of(USER);
		return user;
	}
	protected getInstanz(): void {
		this.getUser()
			.subscribe(user => { user });
	}
	public isLoggedIn(): boolean {
		return this.isUser
	}
	protected canActivate(): boolean {
		return this.isLoggedIn()
	}
	public getUsers(): User[] {
		this.getUser()
			.subscribe(user => { this.users = user });
		return (this.users)
	}
}
