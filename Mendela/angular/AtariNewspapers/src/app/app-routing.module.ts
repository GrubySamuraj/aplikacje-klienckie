import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddComponent } from './add/add.component';
import { EditContainerComponent } from './edit-container/edit-container.component';
import { ListComponent } from './list/list.component';
import { NewspaperContainerComponent } from './newspaper-container/newspaper-container.component';
import { NewspapersComponent } from './newspapers/newspapers.component';

const routes: Routes = [
  { path: 'add', component: EditContainerComponent },
  { path: ':album', component: ListComponent },
  { path: ':album/:year', component: ListComponent },
  { path: '', component: NewspaperContainerComponent },
  { path: '**', component: NewspapersComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [ListComponent, NewspaperContainerComponent];
