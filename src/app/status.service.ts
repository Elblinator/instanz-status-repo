import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { Instanz, Status } from './00_data/instanzen'
import { STATUS } from './00_data/mock-data';
import { INSTANZ } from './00_data/mock-data-real'


@Injectable({ providedIn: 'root' })
export class StatusService {
  ////////DON'T FORGET/////////
  private _url = 'link_url'

  constructor(
    private http: HttpClient
    ) { }
    public getStati(): Observable<Status[]> {
      const stati = of(STATUS);
      return stati;
  }
  public getData(): Observable<Instanz[]>{
    //return this.http.get<Instanz[]>(this._url)
    const instanz = of(INSTANZ);
    return instanz;
  }
  public getName(name: string): Observable<Status> {
    const status:Status = STATUS.find(h => h.name === name)!;
    return of(status);
  }
  public getInstanz(): Observable<Instanz[]> {
    const instanz = of(INSTANZ);
    return instanz;
  }
  public getInst(name: string): Observable<Instanz> {
    const instance = INSTANZ.find(h => h.name === name)!;
    return of(instance);
  }
}