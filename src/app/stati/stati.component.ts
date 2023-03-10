import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';

import { Instanz, InstanzService, Status } from '../00_data/instanzen';
import { StatusService } from '../status.service';
import { UserService } from '../user.service';
import { DialogAnimationsExampleDialog } from '../dialog/dialog.component';
import { FilterService } from '../filter.service';


@Component({
  selector: 'app-stati',
  templateUrl: './stati.component.html',
  styleUrls: ['./stati.component.css']
})
export class StatiComponent implements OnInit {
  instanzen: Instanz[] = []
  stati: Status[] = [];
  curInstServ: InstanzService = {instanz:"", service:"", status:""}
  instanzOffline: InstanzService[] = []
  instanzOnline: InstanzService[] = []
  instanzSlow: InstanzService[] = []
  instanzError: InstanzService[] = []

  constructor(
    private statusService: StatusService,
    private userService: UserService,
    public dialog: MatDialog,
    private filterService: FilterService
    ) { }

  public ngOnInit(): void {
    this.getData()
    this.sortData()
  }
  private getData(): void{
    this.statusService.getData()
    .subscribe(instanzen => {this.instanzen = instanzen});
  }
  private sortData():void{
    for(let instanz of this.instanzen){
      if(!instanz.running){
        this.curInstServ= {instanz:instanz.name, service:"", status:"offline"}
        this.instanzOffline.push(this.curInstServ)
      } else {
        this.sortStatus(instanz)
      }
    }
  }
  private sortStatus(instanz:Instanz):void{
    for (let service of instanz.services){
      this.curInstServ= {instanz:instanz.name, service:service.name, status:service.status}
      if(service.status=="online"){
        this.instanzOnline.push(this.curInstServ)
      }
      else if(service.status=="slow"){
        this.instanzSlow.push(this.curInstServ)
      }
      else if(service.status=="error"){
        this.instanzError.push(this.curInstServ)
      }
    }
  }
  public logout():void{
    this.userService.logout()
  }
  public openDialog():void{
    this.dialog.open(DialogAnimationsExampleDialog, {
      data: {
        animal: 'panda',
        instances: this.filterService.reachableInstances(),
        services: this.filterService.reachableService()
      }
    });
  }
}
