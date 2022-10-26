import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { ViewComponent } from './view/view.component';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';

const routes: Routes = [
  { path: 'control', redirectTo: 'control/index', pathMatch: 'full'},
  { path: 'control/index', component: IndexComponent },
  { path: 'control/:postId/view', component: ViewComponent },
  { path: 'control/create', component: CreateComponent },
  { path: 'control/:controlId/edit', component: EditComponent } 
];
   
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ControlRoutingModule { }