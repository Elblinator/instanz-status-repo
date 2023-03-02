import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Instanz } from '../00_data/instanzen';
import { Status } from '../00_data/status';
import { StatusService } from '../status.service';


@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent implements OnInit{
  instanzen: Instanz[] = [];
  arr: number[] = [0,0,0];

  constructor(private statusService: StatusService) { }

  ngOnInit(): void {
    this.getInstanz();
    this.countStati()
  }

  getInstanz(): void {
    this.statusService.getInstanz()
    .subscribe(instanzen => {this.instanzen = instanzen});
  }  
  public resetCount():void {
    this.arr=[0,0,0]
    this.countStati()
  }
  public countStati(): void {
    for(let instanz of this.instanzen){
      this.countStatus(instanz.services) 
    }
  }
  private countStatus(services:Status[]): void {
    for(let service of services){
      this.arr[this.checkStatus(service.status)] +=1
    }
  }
  public checkStatus(status:string): number {
    //numbers correspond ot the indexes from the array (arr)
    // --> arr[0] describes the amount of online stati
    if (status=="online") {
      return 0
    }else if (status=="slow") {
      return 1
    }else {
      return 2
    }
  }
}
