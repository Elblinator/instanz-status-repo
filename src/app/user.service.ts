import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';

import { User } from './00_data/user';
import { USER } from './00_data/mock-user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }
  user=""
  password=""
  isUser=false

  login(user:string, password:string):boolean{
    this.user=user
    this.password=password
    this.isUser=true
    return true
  }
  checkUser(user:string, password:string) : boolean{
    this.getUser()
    if(true){
      
    }
    return true
  }  
  getUser(): Observable<User[]>{
    //return this.http.get<Instanz[]>(this._url)
    const user = of(USER); 
    return user;
  }
  logout():void{
    this.user=""
    this.password=""
    this.isUser = false
  }
}
