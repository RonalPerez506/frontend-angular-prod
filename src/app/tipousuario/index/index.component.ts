import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { TipousuarioService } from '../tipousuario.service';
import { Tipousuario } from '../tipousuario';
import { AuthService } from 'src/app/login/auth.service';


@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  tipousuarios: Tipousuario[] = [];

  // constructor() { }
  constructor(public tipousuarioService: TipousuarioService, private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    this.tipousuarioService.getAll().subscribe((data: Tipousuario[])=>{
      this.tipousuarios = data;
      console.log(this.tipousuarios);
    })
  }

  deleteTipousuario(id: number){
    this.tipousuarioService.delete(id).subscribe(res => {
         this.tipousuarios = this.tipousuarios.filter(item => item.id !== id);
         console.log('tipo de usuario Borrado!');
    })
  }

  editTipousuario(id:number){
    this.router.navigateByUrl('tipousuario/' + id + '/edit');
  }
  
  logout(){
    console.log("Si llego hasta logout");
    this.authService.singout().subscribe((res:any) =>{
      localStorage.clear();

      this.router.navigate(['']);
  
    })
  }

  
}   