import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { StatusService } from './status.service';
import { Instanz, Status, isStatus } from './00_data/instanzen';
@Injectable({
  providedIn: 'root'
})
export class FilterService {
  instanzen: Instanz[] = []

  possibleInstances: string[] = []
  possibleServices: string[] = []

  chosenInstances: string[] = []
  chosenServices: string[] = []

  first = true
  constructor(
    private statusService: StatusService,
  ) { }
  public OnInit(): void {
    this.getPossibleInstStatus()
  }
  public getPossibleInstStatus(): void{
    this.statusService.getData()
    .subscribe(instanzen => {this.instanzen = instanzen;});
    this.possibleInstances = this.turnIntoArray(this.instanzen)  
    for(const instanz of this.instanzen) {
      this.possibleServices = this.turnIntoArray(instanz.services)
      break
    }
  }
  public setChosenONCE():void{
    if(this.first){
      this.first = false
      this.chosenInstances = this.possibleInstances
      this.chosenServices = this.possibleServices
    }
  }
  public turnIntoArray(list:(Status[]|Instanz[])): string[]{
    const arr:string[] = []
    for(const name of list){
      arr.push(name.name)
    }
    return arr
  }
  public setFilter(toppings: FormGroup[]):void {
    this.chosenInstances = []
    this.chosenServices = []
    const tops:FormGroup = toppings[0]
    const ping:FormGroup = toppings[1]
    let mapped = Object.entries(tops.value)
    for (const map of mapped){
      if (map[1]){
        this.chosenInstances.push(map[0])
      }
    }
    mapped = Object.entries(ping.value)
    for (const map of mapped){
      if (map[1]){
        this.chosenServices.push(map[0])
      }
    }
  }
  public reachableInstances():string[]{
    return this.possibleInstances
  }
  public reachableService():string[]{
    return this.possibleServices
  }
  public activatedInstances():string[]{
    return this.chosenInstances
  }
  public activatedService():string[]{
    return this.chosenServices
  }
  public isActivated(str:string):boolean{
    if(this.chosenServices.includes(str) || this.chosenInstances.includes(str)) {
      return true
    }
    return false
  }
  public isSelected(name:(Status[]|Instanz[])):string[]{
    if (isStatus(name)){
      return this.chosenServices
    } else{
      return this.chosenInstances
    }
  }
}