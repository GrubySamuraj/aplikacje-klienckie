import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { InputComponent } from './input/input.component';
import { NewspapersComponent } from './newspapers/newspapers.component';
import { NewsPaperComponent } from './news-paper/news-paper.component';
import { NewsPaperDataService } from './news-paper-data.service';
import { YearButtonComponent } from './year-button/year-button.component';
import { ElementListComponent } from './element-list/element-list.component';

@NgModule({
  declarations: [
    AppComponent,
    InputComponent,
    NewspapersComponent,
    NewsPaperComponent,
    YearButtonComponent,
    routingComponents,
    ElementListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [NewsPaperDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
