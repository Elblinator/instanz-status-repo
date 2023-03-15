import { Component, OnInit } from '@angular/core';

import { Instanz } from '../00_data/instanzen';
import { StatusService } from '../status.service';
import { UserService } from '../user.service';
import { OnlineService } from '../online.service'
import { CheckStatusService } from '../check-status.service';
import { FormControl } from '@angular/forms';
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
  userName:string = this.userService.user
  password:string = this.userService.password
  first = true
  instanzNamenList: string[] = this.filterService.reachableInstances()
  instanzNamen = new FormControl('')

  constructor(
    private statusService: StatusService,
    private userService: UserService,
    private onlineService: OnlineService,
    private checkStatusService: CheckStatusService,
    private filterService: FilterService
    ) { }

  
    /*isUser:boolean= this.userService.isUser
    userName:string= this.userService.user
    password:string= this.userService.password*/

  ngOnInit(): void {
    this.getInstanz();
    this.resetCount()
  }

  getInstanz(): void {
    this.statusService.getInstanz()
    .subscribe(instanzen => {this.instanzen = instanzen});
  }  
  public resetCount():void {
    this.arrService=this.checkStatusService.resetCount()
    this.arrOnline=this.onlineService.resetCount()
  }
  public isLoggedIn(): boolean{
    return this.userService.isLoggedIn()
  }
}
