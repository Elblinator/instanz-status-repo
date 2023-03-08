import { Component, OnInit} from '@angular/core';

import { StatusService } from '../status.service';
import { Instanz } from '../00_data/instanzen';
import { UserService } from '../user.service';



@Component({
  selector: 'app-instanz',
  templateUrl: './instanz.component.html',
  styleUrls: ['./instanz.component.css']
})

export class InstanzComponent implements OnInit {
  instanzen: Instanz[] = [];

  constructor(
    private statusService: StatusService,
    private userService: UserService
    ) { }

  ngOnInit(): void {
    this.statusService.getData()
    .subscribe(instanzen => {this.instanzen = instanzen});
  }
  public logout():void{
    this.userService.logout()
  }
}
