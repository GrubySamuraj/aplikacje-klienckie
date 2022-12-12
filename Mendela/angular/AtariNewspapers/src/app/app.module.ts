import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from "@angular/forms";

import { HttpClientModule } from '@angular/common/http';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { InputComponent } from './input/input.component';
import { NewspapersComponent } from './newspapers/newspapers.component';
import { NewsPaperComponent } from './news-paper/news-paper.component';
import { NewsPaperDataService } from './news-paper-data.service';
import { YearButtonComponent } from './year-button/year-button.component';
import { ElementListComponent } from './element-list/element-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AddComponent } from './add/add.component';
import { EditContainerComponent } from './edit-container/edit-container.component';
import { MatButtonModule } from '@angular/material/button';
import { EditComponent } from './edit/edit.component';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';

import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [
    AppComponent,
    InputComponent,
    NewspapersComponent,
    NewsPaperComponent,
    YearButtonComponent,
    routingComponents,
    ElementListComponent,
    AddComponent,
    EditContainerComponent,
    EditComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSelectModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatTableModule,
    MatIconModule
  ],
  providers: [NewsPaperDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
