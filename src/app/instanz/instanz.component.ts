import { Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';

import { StatusService } from '../status.service';
import { Instanz } from '../00_data/instanzen';
import { UserService } from '../user.service';
import { DialogAnimationsExampleDialog } from '../dialog/dialog.component';
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
    public dialog: MatDialog,
    public filterService: FilterService,
    public messageService:MessageChannel
    ) { }

  ngOnInit(): void {
    this.statusService.getData()
    .subscribe(instanzen => {this.instanzen = instanzen});
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
