import { NgModule } from '@angular/core';
import { RouterModule, Routes, } from '@angular/router';

import { StatiComponent } from './stati/stati.component';
import { InstanzComponent } from './instanz/instanz.component';
import { InstanzDetailComponent } from './instanz-detail/instanz-detail.component';
import { StartComponent } from './start/start.component';
import { UserService } from './user.service';

const routes: Routes = [
  { path: 'start',         component: StartComponent },
  { path: 'status',        component: StatiComponent,         data:{isUser: true}, canActivate: [ UserService ] },
  { path: 'instanz',       component: InstanzComponent,       data:{isUser: true}, canActivate: [ UserService ] },
  { path: 'instanz/:name', component: InstanzDetailComponent, data:{isUser: true}, canActivate: [ UserService ] },
  { path: '', redirectTo: '/start', pathMatch: 'full',        data:{isUser: false} },  
  { path: '', redirectTo: '/start', pathMatch: 'full'},  

];



@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}

