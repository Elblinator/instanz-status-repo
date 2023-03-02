import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { StatiComponent } from './stati/stati.component';
import { InstanzComponent } from './instanz/instanz.component';
import { StatusDetailComponent } from './status-detail/status-detail.component';
import { InstanzDetailComponent } from './instanz-detail/instanz-detail.component';
import { StartComponent } from './start/start.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'start', component: StartComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'detail/:name', component: StatusDetailComponent },
  { path: 'stati', component: StatiComponent },
  { path: 'instanz', component: InstanzComponent },
  { path: 'instanz/:name', component: InstanzDetailComponent },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}

