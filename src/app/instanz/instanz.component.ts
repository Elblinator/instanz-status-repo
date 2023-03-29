import { Component, OnInit} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { StatusService } from '../status.service';
import { Instanz, InstanzService } from '../00_data/instanzen';
import { DialogComponent } from '../dialog/dialog.component';
import { FilterService } from '../filter.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-instanz',
  templateUrl: './instanz.component.html',
  styleUrls: ['./instanz.component.css']
})

export class InstanzComponent implements OnInit {
  instanzen: Instanz[] = [];
  instanzNamenList: string[] = this.filterService.reachableInstances()
  instanzNamen = new FormControl('')

  instanzOffline: InstanzService[] = []
  instanzOnline: InstanzService[] = []
  instanzSlow: InstanzService[] = []
  instanzError: InstanzService[] = []

  constructor(
    private statusService: StatusService,
    public filterService: FilterService,
    public dialog: MatDialog,
    ) { }

  public ngOnInit(): void {
    this.statusService.getData()
    .subscribe(instanzen => {this.instanzen = instanzen});
  }
  public openDialog():void{
    this.dialog.open(DialogComponent)
  }
  public isActivated(str:string):boolean{
    return this.filterService.isActivated(str)
  }
  public whatStatus(instanz:Instanz):string {
    //let array = this.statusService.sortData()
    let status: string[] = ["offline", "error", "slow", "online"]
    let id: number = 3
    if(!instanz.running){
      id = 0
    } else {
      instanz.services.forEach(element => {
        if("error" === element.status){
          id = 1
        } 
        if ("slow" === element.status && id > 1) {
          id = 2
        }
      })
    }
    return status[id]
  }
}