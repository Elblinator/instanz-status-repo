import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';

import { FilterService } from '../filter.service';
import { DialogData } from '../00_data/instanzen';


@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent {
  instances: string[] = []
  services: string[] = []
  tops: FormGroup 
  ping: FormGroup
  

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private filterService: FilterService,
    private _formBuilder: FormBuilder,
  ) { 
    this.instances = this.filterService.reachableInstances()
    this.services = this.filterService.reachableService()

    this.tops = this._formBuilder.group(Object.fromEntries(this.instances.map(e => [e,(this.filterService.isActivated(e))])));
    this.ping = this._formBuilder.group(Object.fromEntries(this.services.map(e => [e,(this.filterService.isActivated(e))])));

    this.filterService.setFilter([this.tops, this.ping])
  }
  public openDialog(): void{ }
  public setFilter(){
    this.filterService.setFilter([this.tops, this.ping])
  }
}
