import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { Instanz, Status } from './00_data/instanzen'
import { STATUS } from './00_data/mock-data';
import { INSTANZ } from './00_data/mock-data-real'

import { MessageService } from './message.service';

@Injectable({ providedIn: 'root' })
export class StatusService {

  private _url: string = 'link_url'

  constructor(
    private messageService: MessageService,
    private http: HttpClient
    ) { }

    getStati(): Observable<Status[]> {
      const instanz = this.getData()
      const stati = of(STATUS);
      return stati;
    }
  getData(): Observable<Instanz[]>{
    //return this.http.get<Instanz[]>(this._url)
    const instanz = of(INSTANZ);
    this.messageService.add('StatusService: fetched Instanz'); 
    return instanz;
  }
  getName(name: string): Observable<Status> {
    // For now, assume that a hero with the specified `id` always exists.
    // Error handling will be added in the next step of the tutorial.
    const status = STATUS.find(h => h.name === name)!;
    return of(status);
  }
  getInstanz(): Observable<Instanz[]> {
    const instanz = of(INSTANZ);
    return instanz;
  }
  getInst(name: string): Observable<Instanz> {
    const instance = INSTANZ.find(h => h.name === name)!;
    return of(instance);
  }
  suchen(){
    
  }
}