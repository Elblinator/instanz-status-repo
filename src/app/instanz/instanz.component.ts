import { Component, OnInit} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { StatusService } from '../status.service';
import { Instanz } from '../00_data/instanzen';
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

  constructor(
    private statusService: StatusService,
    public filterService: FilterService,
    public dialog: MatDialog,
    ) { }

  ngOnInit(): void {
    this.statusService.getData()
    .subscribe(instanzen => {this.instanzen = instanzen});
  }
  public openDialog():void{
    this.dialog.open(DialogComponent)
  }
  public isActivated(str:string):boolean{
    return this.filterService.isActivated(str)
  }
}