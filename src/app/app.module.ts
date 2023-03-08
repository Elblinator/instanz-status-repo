import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { OldStatusDetailComponent } from './old-status-detail/old-status-detail.component';
import { StatiComponent } from './stati/stati.component';
import { MessagesComponent } from './messages/messages.component';
import { InstanzComponent } from './instanz/instanz.component';

import { AppRoutingModule } from './app-routing.module';
import { InstanzDetailComponent } from './instanz-detail/instanz-detail.component';
import { StartComponent } from './start/start.component';
import { OldStatiComponent } from './old-stati/old-stati.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  declarations: [
    AppComponent,
    DashboardComponent,
    StatiComponent,
    OldStatusDetailComponent,
    MessagesComponent,
    InstanzComponent,
    InstanzDetailComponent,
    StartComponent,
    OldStatiComponent
  ],
  bootstrap: [ AppComponent ],
  providers: [ ]
})
export class AppModule { }
