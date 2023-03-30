import { Injectable } from '@angular/core';
import { WAWRNING } from './00_data/warn-text';

@Injectable({
  providedIn: 'root'
})
export class WarnService {
  service = "";
  warn = "";

  /* gets called with a service, 
  *  this.service is being updated
  *  the corresponding warning (this.warn) is updated too
  */
  public setServiceAndMsg(service: string): void {
    this.service = service;
    WAWRNING.forEach(element => {
      if (element.service === service) {
        this.warn = element.warn;
      }
    })
  }
  /* 
    return the service and warning which were set earlier
  */
  public getServiceAndMsg(): string[] {
    return ([this.service, this.warn]);
  }
}

