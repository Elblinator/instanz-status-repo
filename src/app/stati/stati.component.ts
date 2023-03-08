import { Component, OnInit } from '@angular/core';

import { Status } from '../00_data/status';
import { Instanz } from '../00_data/instanzen';
import { StatusService } from '../status.service';
import { UserService } from '../user.service';


@Component({
  selector: 'app-stati',
  templateUrl: './stati.component.html',
  styleUrls: ['./stati.component.css']
})
export class StatiComponent implements OnInit {
  instanzen: Instanz[] = []
  stati: Status[] = [];

  constructor(
    private statusService: StatusService,
    private userService: UserService
    ) { }

  public ngOnInit(): void {
    this.getStati();
  }

  private getStati(): void {
    this.statusService.getStati()
    .subscribe(stati => this.stati = stati);
  }
  private getSt(): void {
    this.statusService.getData()
    .subscribe(instanzen => this.instanzen = instanzen);

    //this.stati = this.instanzen.name
    //for unstanz in isntanzen put status in stati #to be implemented
  }
  public logout():void{
    this.userService.logout()
  }
}
