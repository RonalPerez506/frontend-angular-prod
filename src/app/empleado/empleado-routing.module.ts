import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { IndexComponent } from './index/index.component';
import { ViewComponent } from './view/view.component';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';
   
const routes: Routes = [
  { path: 'empleado', redirectTo: 'empleado/index', pathMatch: 'full'},
  { path: 'empleado/index', component: IndexComponent },
  { path: 'empleado/:empleadoId/view', component: ViewComponent },
  { path: 'empleado/create', component: CreateComponent },
  { path: 'empleado/:empleadoId/edit', component: EditComponent } 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmpleadoRoutingModule { }
