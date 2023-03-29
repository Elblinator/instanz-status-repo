import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { Instanz, InstanzService, Status } from './00_data/instanzen'
import { INSTANZ } from './00_data/mock-data-real'
import { FormControl } from '@angular/forms';
import { FilterService } from './filter.service';


@Injectable({ providedIn: 'root' })
export class StatusService {
  ////////DON'T FORGET/////////
  private _url = 'link_url'


  instanzen: Instanz[] = []
  stati: Status[] = [];
  curInstServ: InstanzService = {instanz:"", service:"", status:""}
  instanzOffline: InstanzService[] = []
  instanzOnline: InstanzService[] = []
  instanzSlow: InstanzService[] = []
  instanzError: InstanzService[] = []
  instanzNamen = new FormControl('')

  constructor(
    private http: HttpClient,
    ) {this.getDatas()}

  private getDatas(): void{
    this.getData()
    .subscribe(instanzen => {this.instanzen = instanzen});
  }
  public getData(): Observable<Instanz[]>{
    //return this.http.get<Instanz[]>(this._url)
    this.http
    this._url
    const instanz = of(INSTANZ);
    return instanz;
  }
  public getInstanz(): Observable<Instanz[]> {
    const instanz = of(INSTANZ);
    return instanz;
  }
  public getInst(name: string): Observable<Instanz> {
    const instance = INSTANZ.find(h => h.name === name)!;
    return of(instance);
  }
  public sortData(){
    for(const instanz of this.instanzen){
      if(!instanz.running){
        this.curInstServ = {instanz:instanz.name, service:"", status:"offline"}
        this.instanzOffline.push(this.curInstServ)
      } else {
        this.sortStatus(instanz)
      }
    }
    return [this.instanzOffline, this.instanzError, this.instanzSlow, this.instanzOnline]
  }
  private sortStatus(instanz:Instanz):void{
    for (const service of instanz.services){
      this.curInstServ= {instanz:instanz.name, service:service.name, status:service.status}
      if(service.status=="online"){
        this.instanzOnline.push(this.curInstServ)
      }
      else if(service.status=="slow"){
        this.instanzSlow.push(this.curInstServ)
      }
      else if(service.status=="error"){
        this.instanzError.push(this.curInstServ)
      }
    }
  }
}