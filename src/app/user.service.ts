import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { User } from './00_data/interfaces';
import { USER } from './00_data/mock-user';

@Injectable({
	providedIn: 'root'
})
export class UserService {
	users: User[] = [];
	user = "";
	password = "";
	isUser = false;
	//// For testing purposes /////
	isTesting = true;
	isTestingOnline = true;
	//////////////////

	constructor() {
		if (this.isTesting) {
			this.isUser = this.isTestingOnline;
		}
	}
	/* if this function is called user and password are already checked and correct
	*  then the current user is updated and isUser is true
	*/
	protected login(user: string, password: string): void {
		this.user = user;
		this.password = password;
		this.isUser = true;
	}
	/* throw saved user and passwort out and set isUser to false */
	public logout(): void {
		this.user = "";
		this.password = "";
		this.isUser = false;
	}
	/* get a name and a password 
	*  return boolean if they are correct and corresponding name and password
	*/
	public checkLogin(name: (string | null), password: (string | null)): boolean {
		let id = -1;
		this.getUsers();
		if (typeof (name) === "string" && typeof (password) === "string") {
			// check if user actually exists
			this.users.forEach(element => {
				if (element.user == name) {
					id = element.id;
				}
			});
			// check if name and passwort match the same user and login if they match
			if (id > -1 && this.users[id].password == password) {
				this.login(name, password);
			} else {
				this.isUser = false;
			}
		}
		//////////Testing Interception////////////
		// this overwrites everything above if we are testing 
		if (this.isTesting) {
			this.isUser = this.isTestingOnline;
		}
		//////////////////////////////////////////

		return this.isUser;
	}

	public isLoggedIn(): boolean {
		return this.isUser;
	}
	// same as above, but app-routing.module needs this one 
	protected canActivate(): boolean {
		return this.isLoggedIn();
	}
	// turn Observable User[] into User[]
	public getUsers(): User[] {
		this.getUser()
			.subscribe(user => { this.users = user });
		return (this.users);
	}
	// get Users as Observables
	private getUser(): Observable<User[]> {
		//return this.http.get<Instance[]>(this._url)
		const user = of(USER);
		return user;
	}
}
