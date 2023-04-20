import { Injectable } from '@angular/core';
import { WARNING } from './00_data/warn-text';

@Injectable({
  providedIn: 'root'
})
export class WarnService {
  private service = "";
  private warn = "";

  /* gets called with a service, 
  *  this.service is being updated
  *  the corresponding warning (this.warn) is updated too
  */
  public setServiceAndMsg(service: string): void {
    this.service = service;
    WARNING.forEach(element => {
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

