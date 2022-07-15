import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import {MatListModule} from '@angular/material/list';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TaskModule } from './task/task.module';
import { TaskSecondaryModule } from './task-secondary/task-secondary.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatIconModule} from '@angular/material/icon';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { DragDropModule } from "@angular/cdk/drag-drop";


@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    TaskModule,
    HttpClientModule,
    TaskSecondaryModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatTableModule,
    MatSelectModule,
    MatNativeDateModule,
    MatRippleModule,
    MatButtonModule,
    MatInputModule,
    MatPaginatorModule,
    MatListModule,
    MatIconModule,
    MatCheckboxModule,
    DragDropModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
