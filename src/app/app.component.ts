import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

import { UserService } from './user.service';
import { FilterService } from './filter.service';
import { Observable, map, shareReplay } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  userName:string = this.userService.user
  password:string = this.userService.password
  
  constructor(
    private userService: UserService,
    private filterService: FilterService,
    private breakpointObserver: BreakpointObserver
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

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
  .pipe(
    map(result => result.matches),
    shareReplay()
  );
  public logout():void{
    this.userService.logout()
  }
  public checkUser(userName:string, password:string):boolean{
    return this.userService.checkUser(userName, password)
  }  
}