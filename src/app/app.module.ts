import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FileDropComponent } from './file-drop/file-drop.component';
import { NgxFileDropModule } from 'ngx-file-drop';
import {HttpClientModule} from "@angular/common/http";
import {ConfigService} from './config.service';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatCard, MatCardModule, MatIconModule, MatToolbarModule} from "@angular/material";
import {FormsModule} from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    FileDropComponent

  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    NgxFileDropModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatIconModule,
    MatToolbarModule
  ],
  providers: [ConfigService],
  bootstrap: [AppComponent]
})
export class AppModule { }
