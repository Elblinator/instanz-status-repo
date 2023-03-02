import { Component, OnInit } from '@angular/core';

import { Status } from '../00_data/status';
import { StatusService } from '../status.service';

@Component({
  selector: 'app-stati',
  templateUrl: './stati.component.html',
  styleUrls: ['./stati.component.css']
})
export class StatiComponent implements OnInit {
  stati: Status[] = [];

  constructor(private statusService: StatusService) { }

  public ngOnInit(): void {
    this.getStati();
  }

  private getStati(): void {
    this.statusService.getStati()
    .subscribe(stati => this.stati = stati);
  }
}
