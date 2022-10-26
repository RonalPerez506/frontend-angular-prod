import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { IndexComponent } from './index/index.component';
import { ViewComponent } from './view/view.component';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';

const routes: Routes = [
  { path: 'departamento', redirectTo: 'tipousuario/index', pathMatch: 'full'},
  { path: 'tipousuario/index', component: IndexComponent },
  { path: 'tipousuario/:tipousuarioId/view', component: ViewComponent },
  { path: 'tipousuario/create', component: CreateComponent },
  { path: 'tipousuario/:tipousuarioId/edit', component: EditComponent } 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TipousuarioRoutingModule { }
