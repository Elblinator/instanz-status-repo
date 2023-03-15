import { NgModule } from '@angular/core';
import { RouterModule, Routes, } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { StatiComponent } from './stati/stati.component';
import { OldStatiComponent } from './old-stati/old-stati.component';
import { InstanzComponent } from './instanz/instanz.component';
import { OldStatusDetailComponent } from './old-status-detail/old-status-detail.component';
import { InstanzDetailComponent } from './instanz-detail/instanz-detail.component';
import { StartComponent } from './start/start.component';
import { UserService } from './user.service';

const routes: Routes = [
  { path: 'start',         component: StartComponent },
  { path: 'dashboard',     component: DashboardComponent,     data:{isUser: true}, canActivate: [ UserService ] },
  { path: 'status/:name',  component: OldStatusDetailComponent,  data:{isUser: true}, canActivate: [ UserService ] },
  { path: 'status',        component: StatiComponent,         data:{isUser: true}, canActivate: [ UserService ] },
  { path: 'old-status',    component: OldStatiComponent,      data:{isUser: true}, canActivate: [ UserService ] },
  { path: 'instanz',       component: InstanzComponent,       data:{isUser: true}, canActivate: [ UserService ] },
  { path: 'instanz/:name', component: InstanzDetailComponent, data:{isUser: true}, canActivate: [ UserService ] },
  { path: '', redirectTo: '/start', pathMatch: 'full' },  

];



@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}

