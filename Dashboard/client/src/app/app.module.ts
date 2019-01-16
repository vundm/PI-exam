import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { NvD3Module } from 'ng2-nvd3';

import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { AppDetailsComponent } from './app-details/app-details.component';

import 'd3';
import 'nvd3';

const config: SocketIoConfig = { url: 'http://localhost:3000', options: {} };

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    AppDetailsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    NvD3Module,
    SocketIoModule.forRoot(config)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
