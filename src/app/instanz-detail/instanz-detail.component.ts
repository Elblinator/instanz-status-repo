import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Instanz } from '../00_data/instanzen';
import { StatusService } from '../status.service';

@Component({
  selector: 'app-status-detail',
  templateUrl: './instanz-detail.component.html',
  styleUrls: [ './instanz-detail.component.css' ]
})
export class InstanzDetailComponent implements OnInit {
  instanzen: Instanz | undefined;

  constructor(
    private route: ActivatedRoute,
    private statusService: StatusService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getName();
  }

  getName(): void {
    const name = String(this.route.snapshot.paramMap.get('name'));
    this.statusService.getInst(name)
      .subscribe(instanz => this.instanzen = instanz);
  }

  goBack(): void {
    this.location.back();
  }
}

