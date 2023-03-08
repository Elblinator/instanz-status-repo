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
  { path: 'start',         component: StartComponent },
  { path: 'dashboard',     component: DashboardComponent,     data:{isUser: true}, canActivate: [ UserService ] },
  { path: 'status/:name',  component: StatusDetailComponent,  data:{isUser: true}, canActivate: [ UserService ] },
  { path: 'status',        component: StatiComponent,         data:{isUser: true}, canActivate: [ UserService ] },
  { path: 'instanz',       component: InstanzComponent,       data:{isUser: true}, canActivate: [ UserService ] },
  { path: 'instanz/:name', component: InstanzDetailComponent, data:{isUser: true}, canActivate: [ UserService ] },
  { path: '', redirectTo: '/start', pathMatch: 'full' },
];



@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}

