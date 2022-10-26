import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { DepartamentoService } from '../departamento.service';
import { Departamento } from '../departamento';
import { AuthService } from 'src/app/login/auth.service';


@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  departamentos: Departamento[] = [];

  // constructor() { }
  constructor(public departamentoService: DepartamentoService, private router: Router, private authService: AuthService,) { }

  ngOnInit(): void {
    this.departamentoService.getAll().subscribe((data: Departamento[])=>{
      this.departamentos = data;
      console.log(this.departamentos);
    })
  }

  deleteDepartamento(id: number){
    this.departamentoService.delete(id).subscribe(res => {
         this.departamentos = this.departamentos.filter(item => item.id !== id);
         console.log('Departamento Borrado!');
    })
  }

  editDepartamento(id:number){
    this.router.navigateByUrl('departamento/' + id + '/edit');
  }
  
  logout(){
    console.log("Si llego hasta logout");
    this.authService.singout().subscribe((res:any) =>{
      localStorage.clear();

      this.router.navigate(['']);
  
    })
  }

}
