import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './pages/home/home.component';
import { UserTableComponent } from './pages/home/component/user-table/user-table.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatChipsModule } from '@angular/material/chips';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { AddUserDialogComponent } from './pages/add-user-dialog/add-user-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RemoveUserDialogComponent } from './pages/remove-user-dialog/remove-user-dialog.component';
import { MultiInputComponent } from './pages/add-user-dialog/component/multi-input/multi-input.component';
import { MessageDialogComponent } from './pages/message-dialog/message-dialog.component';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    UserTableComponent,
    AddUserDialogComponent,
    RemoveUserDialogComponent,
    MultiInputComponent,
    MessageDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NoopAnimationsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatChipsModule,
    MatInputModule,
    HttpClientModule,
    CommonModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
