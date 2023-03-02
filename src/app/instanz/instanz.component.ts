import { Component, OnInit} from '@angular/core';

import { StatusService } from '../status.service';
import { Instanz } from '../00_data/instanzen';



@Component({
  selector: 'app-instanz',
  templateUrl: './instanz.component.html',
  styleUrls: ['./instanz.component.css']
})

export class InstanzComponent implements OnInit {
  instanzen: Instanz[] = [];

  constructor(
    private statusService: StatusService,
    ) { }

  ngOnInit(): void {
    this.getInstanz();
  }

  getInstanz(): void {
    this.statusService.getInstanz()
    .subscribe(instanzen => {this.instanzen = instanzen});
  }
}
