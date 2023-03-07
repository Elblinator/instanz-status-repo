import { inject, NgModule } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterModule, Routes, UrlSegment, UrlSegmentGroup, UrlTree } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { StatiComponent } from './stati/stati.component';
import { InstanzComponent } from './instanz/instanz.component';
import { StatusDetailComponent } from './status-detail/status-detail.component';
import { InstanzDetailComponent } from './instanz-detail/instanz-detail.component';
import { StartComponent } from './start/start.component';
import { UserService } from './user.service';

const routes: Routes = [
  { path: 'start', component: StartComponent },
  { path: 'start',
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'status/:name', component: StatusDetailComponent },
      { path: 'status', component: StatiComponent },
      { path: 'instanz', component: InstanzComponent },
      { path: 'instanz/:name', component: InstanzDetailComponent },
    ],
    canActivate: [(route:ActivatedRouteSnapshot)=> {
      if(!inject(UserService).isLoggedIn()){
        return inject(Router).createUrlTree(['start'])
      }
      return true
    }],    
    canMatch: [(route:ActivatedRouteSnapshot)=> {
      if(!inject(UserService).isLoggedIn()){
        return inject(Router).createUrlTree(['start'])
      }
      return true
    }],
  },
  { path: '', redirectTo: '/start', pathMatch: 'full' },
];



@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}

