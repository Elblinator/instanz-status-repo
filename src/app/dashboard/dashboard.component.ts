import { Component, OnInit } from '@angular/core';
import { StatusService } from '../status.service';
import { Instanz, Status } from '../00_data/instanzen'
import { UserService } from '../user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ]
})
export class DashboardComponent implements OnInit {
  stati: Status[] = [];
  instances: Instanz[] = [];

  constructor(
    private statusService: StatusService,
    private userService: UserService
    ) { }

  ngOnInit(): void {
    this.getStati();
    this.getInst()
  }

  getStati(): void {
    this.statusService.getStati()
      .subscribe(stati => this.stati = stati.slice(1, 5));
  }
  getInst():void{ 
    this.statusService.getInstanz()
    .subscribe(instances =>this.instances = instances)
  }
  public logout():void{
    this.userService.logout()
  }
}