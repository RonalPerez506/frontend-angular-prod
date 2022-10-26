import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { IndexComponent } from './index/index.component';
import { ViewComponent } from './view/view.component';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';

const routes: Routes = [
  { path: 'departamento', redirectTo: 'departamento/index', pathMatch: 'full'},
  { path: 'departamento/index', component: IndexComponent },
  { path: 'departamento/:departamentoId/view', component: ViewComponent },
  { path: 'departamento/create', component: CreateComponent },
  { path: 'departamento/:departamentoId/edit', component: EditComponent } 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DepartamentoRoutingModule { }
