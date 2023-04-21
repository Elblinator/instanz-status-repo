import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

import { Instance, RealInstance, SimpleInstance } from './00_data/interfaces'

@Injectable({ providedIn: 'root' })
export class DataService {
  /** url for data change that for yourself dependent on your data-folder */
  private _url = 'http://docker-le.whale:8001/assets/data/example-data.json'
  private real_url = 'http://docker-le.whale:8001/assets/data/status.json'
  private simple_url = 'http://docker-le.whale:8001/assets/data/simple-status.json'

  /** All Data */
  public instancesSubject: BehaviorSubject<Instance[]> = new BehaviorSubject<Instance[]>([]);
  public realInstancesSubject: BehaviorSubject<RealInstance[]> = new BehaviorSubject<RealInstance[]>([]);
  public simpleInstancesSubject: BehaviorSubject<SimpleInstance[]> = new BehaviorSubject<SimpleInstance[]>([]);

  constructor(
    private http: HttpClient,
  ) { this.updateData() }


  /** 
   * initialises the data at the beginning
   * and updates the data every interval (see app.component ngOnInit())
   */
  public updateData(): void {
    console.log('status-service update Data');
    this.http.get<Instance[]>(this._url).subscribe(instances => {
      this.instancesSubject.next(instances)
    });
    this.http.get<SimpleInstance[]>(this.simple_url).subscribe(instances => {
      this.simpleInstancesSubject.next(instances)
    });
    this.http.get<RealInstance[]>(this.real_url).subscribe(instances => {
      this.realInstancesSubject.next(instances)
    });
  }

  getData () {
    this.realInstancesSubject
    this.simpleInstancesSubject
  }
}
