import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TaskModule } from './task/task.module';
import { TaskSecondaryModule } from './task-secondary/task-secondary.module';


@NgModule({
  declarations: [
    AppComponent,
   
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    TaskModule,
    HttpClientModule,
    TaskSecondaryModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
