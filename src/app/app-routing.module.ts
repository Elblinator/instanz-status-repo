import { NgModule } from '@angular/core';
import { RouterModule, Routes, } from '@angular/router';

import { StatiComponent } from './stati/stati.component';
import { InstanceComponent } from './instance/instance.component';
import { InstanceDetailComponent } from './instance-detail/instance-detail.component';
import { StartComponent } from './start/start.component';
import { UserService } from './user.service';

const routes: Routes = [
	{ path: 'start', component: StartComponent },
	{ path: 'service', component: StatiComponent, data: { isUser: true }, canActivate: [UserService] },
	{ path: 'instance', component: InstanceComponent, data: { isUser: true }, canActivate: [UserService] },
	{ path: 'instance/:name', component: InstanceDetailComponent, data: { isUser: true }, canActivate: [UserService] },
	{ path: '', redirectTo: '/start', pathMatch: 'full', data: { isUser: false } },
	{ path: '', redirectTo: '/start', pathMatch: 'full' },

];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }

