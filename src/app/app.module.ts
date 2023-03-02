import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { StatusDetailComponent } from './status-detail/status-detail.component';
import { StatiComponent } from './stati/stati.component';
import { MessagesComponent } from './messages/messages.component';
import { InstanzComponent } from './instanz/instanz.component';

import { AppRoutingModule } from './app-routing.module';
import { InstanzDetailComponent } from './instanz-detail/instanz-detail.component';
import { StartComponent } from './start/start.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule
  ],
  declarations: [
    AppComponent,
    DashboardComponent,
    StatiComponent,
    StatusDetailComponent,
    MessagesComponent,
    InstanzComponent,
    InstanzDetailComponent,
    StartComponent
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
