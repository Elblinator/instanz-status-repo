import { Component } from '@angular/core';

import { UserService } from './user.service';
import { FilterService } from './filter.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(
    private userService: UserService,
    private filterService: FilterService
  ) {}

  public isLoggedIn(): boolean{
    return this.userService.isLoggedIn()
  }
  public initiateFilterData():boolean{
    this.filterService.getPossibleInstStatus()
    this.filterService.setChosenONCE()
    return true
  }

  title = 'Instanzen';
}