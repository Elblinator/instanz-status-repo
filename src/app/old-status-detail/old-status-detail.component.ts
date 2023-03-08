import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Status } from '../00_data/instanzen';
import { StatusService } from '../status.service';
import { UserService } from '../user.service';


@Component({
  selector: 'app-status-detail',
  templateUrl: './old-status-detail.component.html',
  styleUrls: [ './old-status-detail.component.css' ]
})
export class OldStatusDetailComponent implements OnInit {
  status: Status | undefined;

  constructor(
    private route: ActivatedRoute,
    private statusService: StatusService,
    private location: Location,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.getName();
  }

  getName(): void {
    const name = String(this.route.snapshot.paramMap.get('name'));
    this.statusService.getName(name)
      .subscribe(status => this.status = status);
  }
  goBack(): void {
    this.location.back();
  }
  public logout():void{
    this.userService.logout()
  }
}

