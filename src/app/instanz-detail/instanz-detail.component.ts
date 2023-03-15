import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Instanz } from '../00_data/instanzen';
import { StatusService } from '../status.service';
import { UserService } from '../user.service';
import { FormControl } from '@angular/forms';
import { FilterService } from '../filter.service';

@Component({
  selector: 'app-status-detail',
  templateUrl: './instanz-detail.component.html',
  styleUrls: [ './instanz-detail.component.css' ]
})
export class InstanzDetailComponent implements OnInit {
  instanzen: Instanz | undefined;
  instanzNamenList: string[] = this.filterService.reachableInstances()
  instanzNamen = new FormControl('')

  constructor(
    private route: ActivatedRoute,
    private statusService: StatusService,
    private location: Location,
    private userService: UserService,
    private filterService: FilterService
  ) {}

  public ngOnInit(): void {
    this.getName();
  }
  public getName(): void {
    const name = String(this.route.snapshot.paramMap.get('name'));
    this.statusService.getInst(name)
      .subscribe(instanz => this.instanzen = instanz);
  }
  public goBack(): void {
    this.location.back();
  }
  public logout():void{
    this.userService.logout()
  }
  public isLoggedIn(): boolean{
    return this.userService.isLoggedIn()
  }
}

