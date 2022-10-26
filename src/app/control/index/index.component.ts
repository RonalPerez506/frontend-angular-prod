import { Component, OnInit } from '@angular/core';
import { ControlService } from '../control.service';
import { Router } from '@angular/router';

import { Control } from '../control';
import { EmpleadoService } from 'src/app/empleado/empleado.service';
import { Empleado } from 'src/app/empleado/empleado';
import { AuthService } from 'src/app/login/auth.service';


@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  
  controls: Control[] = [];
  empleados: Empleado[] = [];
 

  constructor(public controlService: ControlService,  private router: Router, private authService: AuthService, public empleadoService: EmpleadoService) { }

  /**
   * Write code on Method
   *
   * @return response()
   */
  ngOnInit(): void {
    this.controlService.getname().subscribe((data: any)=>{
      this.controls = data;
      console.log(this.controls);
      
    })  

  }

  /**
   * Write code on Method
   *
   * @return response()
   */
  deleteControl(id:number){
    this.controlService.delete(id).subscribe(res => {
         this.controls = this.controls.filter(item => item.id !== id);
         console.log('Control deleted successfully!');
    })
  }

  // getempleado(){
  //   this.empleadoService.getAll().subscribe((data: Empleado[])=>{
  //     this.empleados = data;
  //     console.log(this.empleados);

  //     for(let i in this.empleados){
  //       this.empleados[i].id;
  //       console.log(this.empleados[i].id);
  //     }
      
  //   })
  // }

  logout(){
    console.log("Si llego hasta logout");
    this.authService.singout().subscribe((res:any) =>{
      localStorage.clear();

      this.router.navigate(['']);
  
    })
  }
}
