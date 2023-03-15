import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { MatNativeDateModule } from '@angular/material/core';


import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { OldStatusDetailComponent } from './old-status-detail/old-status-detail.component';
import { StatiComponent } from './stati/stati.component';
import { InstanzComponent } from './instanz/instanz.component';
import { AppRoutingModule } from './app-routing.module';
import { InstanzDetailComponent } from './instanz-detail/instanz-detail.component';
import { StartComponent } from './start/start.component';
import { OldStatiComponent } from './old-stati/old-stati.component';
import { DialogComponent } from './dialog/dialog.component';
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
    BrowserAnimationsModule
  ],
  declarations: [
    AppComponent,
    DashboardComponent,
    StatiComponent,
    OldStatusDetailComponent,
    InstanzComponent,
    InstanzDetailComponent,
    StartComponent,
    OldStatiComponent,
    DialogComponent,
  ],
  bootstrap: [ AppComponent,],
  providers: [ DialogComponent,  ReactiveFormsModule],
})
export class AppModule { }
