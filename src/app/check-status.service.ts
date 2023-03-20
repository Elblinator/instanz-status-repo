import { Injectable } from '@angular/core';

import { StatusService } from './status.service';
import { Instanz, Status } from './00_data/instanzen';

@Injectable({
  providedIn: 'root'
})
export class CheckStatusService {
  instanzen: Instanz[] = [];
  arrService: number[] = [0,0,0];
  arrStati: Status[] = []

  constructor(private statusService:StatusService) {}

  public getInstanz(): void {
    this.statusService.getInstanz()
    .subscribe(instanzen => {this.instanzen = instanzen});
  }  
  public resetCount():number[] {
    this.arrService=[0,0,0]
    this.countStati()
    return this.arrService
  }
  public countStati(): number[] {
    this.getInstanz()
    for(const instanz of this.instanzen){
      if(instanz.running==true){
        this.countStatus(instanz.services) }
    }
    return this.arrService
  }
  private countStatus(services:Status[]): void {
    for(const service of services){
      this.arrService[this.checkStatus(service.status)] +=1
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
