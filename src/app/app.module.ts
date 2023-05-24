import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { LayoutModule } from '@angular/cdk/layout';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatRadioGroup, MatRadioModule } from '@angular/material/radio';


import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { HttpClientModule } from '@angular/common/http';
import { TranslateModule, TranslatePipe } from '@ngx-translate/core';
import { MatChipsModule } from '@angular/material/chips';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { StartComponent } from './start/start.component';
import { ServiceComponent } from './service/service.component';
import { InstanceComponent } from './instance/instance.component';
import { InstanceDetailComponent } from './instance-detail/instance-detail.component';

import { FilterComponent } from './filter/filter-dialog.component';
import { WarnComponent } from './warn/warn-dialog.component';
import { GridComponent } from './grid/grid/grid.component';
import { TileComponent } from './grid/tile/tile.component';
import { AutocompleteComponent } from './autocomplete/autocomplete.component';
import { GroupInfoComponent } from './GroupInfo/GroupInfo.component';


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
		TranslateModule.forRoot(),
		MatAutocompleteModule,
		MatInputModule,
		MatChipsModule,
		MatRadioModule
	],
	exports: [TranslatePipe, MatRadioGroup],
	declarations: [
		AppComponent,
		ServiceComponent,
		InstanceComponent,
		InstanceDetailComponent,
		StartComponent,
		FilterComponent,
		WarnComponent,
		GridComponent,
		TileComponent,
		AutocompleteComponent,
		GroupInfoComponent
	],
	bootstrap: [AppComponent,],
	providers: [FilterComponent, ReactiveFormsModule, WarnComponent],
})
export class AppModule { }