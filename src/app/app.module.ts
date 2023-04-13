import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { HttpClientModule } from '@angular/common/http';
import {
	TranslateModule,
	TranslatePipe
} from '@ngx-translate/core';

import { AppComponent } from './app.component';
import { StatiComponent } from './stati/stati.component';
import { InstanceComponent } from './instance/instance.component';
import { AppRoutingModule } from './app-routing.module';
import { InstanceDetailComponent } from './instance-detail/instance-detail.component';
import { StartComponent } from './start/start.component';
import { FilterComponent } from './filter/filter-dialog.component';
import { WarnComponent } from './warn/warn-dialog.component';
import { Start2Component } from './start2/start2.component';


@NgModule({
	imports: [
		BrowserModule,
		FormsModule,
		AppRoutingModule,
		HttpClientModule,
		MatDialogModule,
		ReactiveFormsModule,
		MatNativeDateModule,
		MatCardModule,
		MatCheckboxModule,
		MatSelectModule,
		LayoutModule,
		MatToolbarModule,
		MatButtonModule,
		MatSidenavModule,
		MatIconModule,
		MatListModule,
		BrowserAnimationsModule,
		TranslateModule.forRoot()
	],
	exports: [TranslatePipe],
	declarations: [
		AppComponent,
		StatiComponent,
		InstanceComponent,
		InstanceDetailComponent,
		StartComponent,
		Start2Component,
		FilterComponent,
		WarnComponent
	],
	bootstrap: [AppComponent,],
	providers: [FilterComponent, ReactiveFormsModule, WarnComponent],
})
export class AppModule { }