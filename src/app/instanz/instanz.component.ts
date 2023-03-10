import { Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';

import { StatusService } from '../status.service';
import { Instanz } from '../00_data/instanzen';
import { UserService } from '../user.service';
import { DialogComponent } from '../dialog/dialog.component';
import { FilterService } from '../filter.service';



@Component({
  selector: 'app-instanz',
  templateUrl: './instanz.component.html',
  styleUrls: ['./instanz.component.css']
})

export class InstanzComponent implements OnInit {
  instanzen: Instanz[] = [];

  constructor(
    private statusService: StatusService,
    private userService: UserService,
    public filterService: FilterService,
    public dialog: MatDialog,
    ) { }

  ngOnInit(): void {
    this.statusService.getData()
    .subscribe(instanzen => {this.instanzen = instanzen});
  }
  public logout():void{
    this.userService.logout()
  }
  public openDialog():void{
    this.dialog.open(DialogComponent)
  }
  public isActivated(str:string):boolean{
    return this.filterService.isActivated(str)
  }
}
