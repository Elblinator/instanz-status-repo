import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';

import { Status } from './00_data/status';
import { STATUS } from './00_data/mock-data';

//NEEDS IMPLEMENTATION
import { Instanz } from './00_data/instanzen'
import {INSTANZ } from './00_data/mock-data-real'
//import {INSTANZ } from './example-data.json'
//import { User } from './user'
//import {USER } from './example-user


import { MessageService } from './message.service';

@Injectable({ providedIn: 'root' })
export class StatusService {

  constructor(private messageService: MessageService) { }

  getStati(): Observable<Status[]> {
    const stati = of(STATUS);
    this.messageService.add('StatusService: fetched status');
    return stati;
  }
  getName(name: string): Observable<Status> {
    // For now, assume that a hero with the specified `id` always exists.
    // Error handling will be added in the next step of the tutorial.
    const status = STATUS.find(h => h.name === name)!;
    this.messageService.add(`StatusService: fetched instance name=${name}`);
    return of(status);
  }
  getInstanz(): Observable<Instanz[]> {
    const instanz = of(INSTANZ);
    this.messageService.add('StatusService: fetched Instanz'); 
    return instanz;
  }
  getInst(name: string): Observable<Instanz> {
    const instance = INSTANZ.find(h => h.name === name)!;
    this.messageService.add(`StatusService: fetched instance services=${name}`);
    return of(instance);
  }
}