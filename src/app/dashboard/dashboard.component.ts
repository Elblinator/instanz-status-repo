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
    ) { }

  ngOnInit(): void {
    this.getInst()
  }
  getInst():void{ 
    this.statusService.getInstanz()
    .subscribe(instances =>this.instances = instances)
  }
}