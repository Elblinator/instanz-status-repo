import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LayoutModule } from '@angular/cdk/layout';
import { NgModule } from '@angular/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatNativeDateModule } from '@angular/material/core';
import { MatRadioGroup, MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { TranslateModule, TranslatePipe } from '@ngx-translate/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { InstanceComponent } from './instance/instance.component';
import { InstanceDetailComponent } from './instance-detail/instance-detail.component';
import { StartComponent } from './start/start.component';
import { ServiceComponent } from './service/service.component';

import { AutocompleteComponent } from './autocomplete/autocomplete.component';
import { FilterComponent } from './filter/filter-dialog.component';
import { GridComponent } from './grid/grid/grid.component';
import { GroupInfoComponent } from './GroupInfo/GroupInfo.component';
import { TileComponent } from './grid/tile/tile.component';
import { WarnComponent } from './warn/warn-dialog.component';


@NgModule({
	imports: [
		AppRoutingModule,
		BrowserAnimationsModule,
		BrowserModule,
		FormsModule,
		HttpClientModule,
		LayoutModule,
		MatAutocompleteModule,
		MatButtonModule,
		MatCardModule,
		MatCheckboxModule,
		MatChipsModule,
		MatDialogModule,
		MatIconModule,
		MatInputModule,
		MatListModule,
		MatNativeDateModule,
		MatRadioModule,
		MatSelectModule,
		MatSidenavModule,
		MatToolbarModule,
		ReactiveFormsModule,
		TranslateModule.forRoot()
	],
	exports: [TranslatePipe, MatRadioGroup],
	declarations: [
		AppComponent,
		AutocompleteComponent,
		FilterComponent,
		GridComponent,
		GroupInfoComponent,
		InstanceComponent,
		InstanceDetailComponent,
		StartComponent,
		ServiceComponent,
		TileComponent,
		WarnComponent
	],
	bootstrap: [AppComponent,],
	providers: [FilterComponent, ReactiveFormsModule, WarnComponent],
})
export class AppModule { }