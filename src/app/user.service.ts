import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { User } from './00_data/user';
import { USER } from './00_data/mock-user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  user=""
  password=""
  isUser=true

  private login(user:string, password:string){
    this.user=user
    this.password=password
    this.isUser=true
  }
  public logout():void{
    this.user=""
    this.password=""
    this.isUser = false
  }
  public checkUser(user:string, password:string) : boolean{
    this.getUser()
    // if user and password are in the same column in this.getUser() then login() and return true
    this.login(user,password)
    return true
  }  
  public getUser(): Observable<User[]>{
    //return this.http.get<Instanz[]>(this._url)
    const user = of(USER); 
    return user;
  }
  public isLoggedIn():boolean{
    return this.isUser
  }
  public canActivate():boolean {
    return this.isLoggedIn()
  }
}
