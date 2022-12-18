import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditContainerComponent } from './edit-container/edit-container.component';
import { InputComponent } from './input/input.component';
import { ListComponent } from './list/list.component';
import { NewspaperContainerComponent } from './newspaper-container/newspaper-container.component';
import { NewspapersComponent } from './newspapers/newspapers.component';

const routes: Routes = [
  { path: 'add', component: EditContainerComponent },
  { path: 'news', component: NewspapersComponent },
  { path: ':album', component: ListComponent },
  { path: ':album/:year', component: ListComponent },
  { path: '', component: InputComponent },
  { path: '**', redirectTo: '/', pathMatch: "prefix" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [ListComponent, NewspaperContainerComponent];
