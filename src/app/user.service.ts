import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { ActivatedRouteSnapshot, Router, RouterModule, Routes, UrlSegment, UrlSegmentGroup, UrlTree } from '@angular/router';

import { User } from './00_data/user';
import { USER } from './00_data/mock-user';
import { CanActivate } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
  ) { }
  user:string=""
  password:string=""
  isUser:boolean=true

  public login(user:string, password:string):boolean{
    this.user=user
    this.password=password
    this.isUser=true
    return this.isUser 
  }
  public checkUser(user:string, password:string) : boolean{
    this.getUser()
    this.login(user,password)
    return true
  }  
  public getUser(): Observable<User[]>{
    //return this.http.get<Instanz[]>(this._url)
    const user = of(USER); 
    return user;
  }
  public logout():void{
    this.user=""
    this.password=""
    this.isUser = false
  }
  public isLoggedIn():boolean{
    return this.isUser
  }
  public canActivate(route: ActivatedRouteSnapshot):boolean {
    return this.isLoggedIn()
  }
}