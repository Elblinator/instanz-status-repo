import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


import { StatusService } from './status.service';
import { Instanz, Status, isStatus, isInstanz } from './00_data/instanzen';
@Injectable({
  providedIn: 'root'
})
export class FilterService {
  instanzen: Instanz[] = []
  possibleInstances: string[] = []
  possibleServices: string[] = []

  chosenInstances: string[] = []
  chosenServices: string[] = []



  constructor(
    private statusService: StatusService,
    private route: ActivatedRoute,

  ) { }
  public ngOnInit(): void {
    this.getPossibleInstStatus()
    this.chosenInstances = this.possibleInstances
    this.chosenServices = this.possibleServices
  }
  public getPossibleInstStatus(): void{
    this.statusService.getData()
    .subscribe(instanzen => {this.instanzen = instanzen});
    this.possibleInstances = this.turnIntoArray(this.instanzen)
    for(let instanz of this.instanzen) {
      this.possibleServices = this.turnIntoArray(instanz.services)
      break
    }
  }
  public turnIntoArray(list:(Status[]|Instanz[])): string[]{
    let arr:string[] = []
    for(let name of list){
      arr.push(name.name)
    }
    return arr
  }
  public decideFilter(name: Instanz[]|Status[]): void{
    let arr:string[] = this.turnIntoArray(name)
    if(isStatus(name)){
      this.chosenServices = []
      for(let item of arr){
        if(this.possibleServices.includes(item)){
          this.chosenServices.push(item)
        }
      }
    } else {
      this.chosenInstances = []
      for(let item of arr){
        if(this.possibleInstances.includes(item)){
          this.chosenInstances.push(item)
        }
      }
    }
  } 
  isSelected(name:(Status[]|Instanz[])){
    if (isStatus(name)){
      return this.chosenServices
    } else{
      return this.chosenInstances
    }
  }
}