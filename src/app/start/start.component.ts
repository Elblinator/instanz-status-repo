import { Component, OnInit } from '@angular/core';

import { Instanz } from '../00_data/instanzen';
import { StatusService } from '../status.service';
import { UserService } from '../user.service';
import { OnlineService } from '../online.service'
import { CheckStatusService } from '../check-status.service';
import { FilterService } from '../filter.service';


@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent implements OnInit{
  instanzen: Instanz[] = [];
  arrService: number[] = [0,0,0];
  arrOnline: number[] = [0,0];
  userName:string= this.userService.user
  password:string= this.userService.password

  constructor(
    private statusService: StatusService,
    private userService: UserService,
    private onlineService: OnlineService,
    private checkStatusService: CheckStatusService,
    ) { }

  
    /*isUser:boolean= this.userService.isUser
    userName:string= this.userService.user
    password:string= this.userService.password*/

  ngOnInit(): void {
    this.getInstanz();
    this.countStati()
    this.countOnline();
  }

  getInstanz(): void {
    this.statusService.getInstanz()
    .subscribe(instanzen => {this.instanzen = instanzen});
  }  
  public resetCount():void {
    this.arrService=this.checkStatusService.resetCount()
  }
  public countStati(): void {
    this.arrService = this.checkStatusService.countStati()
  }
  public countOnline(): void {
    this.arrOnline = this.onlineService.countOnline()
  }
  public checkUser(userName:string, password:string):boolean{
    if(this.userService.checkUser(userName, password)){
      this.userService.login(userName, password)
      this.userName=userName
      this.password=password
      return true
    }
    return false
  }  
  public logout():void{
    this.userService.logout()
  }
  public isLoggedIn(): boolean{
    return this.userService.isLoggedIn()
  }
}
