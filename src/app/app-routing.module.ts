import { NgModule } from '@angular/core';
import { RouterModule, Routes, } from '@angular/router';

import { ServiceComponent } from './service/service.component';
import { InstanceComponent } from './instance/instance.component';
import { InstanceDetailComponent } from './instance-detail/instance-detail.component';
import { StartComponent } from './start/start.component';
import { Start2Component } from './start2/start2.component';
import { UserService } from './user.service';

const routes: Routes = [
	{ path: 'start', component: StartComponent },
	{ path: 'service', component: ServiceComponent, data: { isUser: true }, canActivate: [UserService] },
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

