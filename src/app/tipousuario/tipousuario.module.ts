import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TipousuarioRoutingModule } from './tipousuario-routing.module';
import { IndexComponent } from './index/index.component';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';
import { ViewComponent } from './view/view.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    IndexComponent,
    CreateComponent,
    EditComponent,
    ViewComponent
  ],
  imports: [
    CommonModule,
    TipousuarioRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class TipousuarioModule { }
