import { Component, OnInit } from '@angular/core';
import { EmpleadoService } from '../empleado.service';
import { Router } from '@angular/router';
import { Empleado } from '../empleado';
import { LocationChangeListener } from '@angular/common';
import { LoginComponent } from 'src/app/login/login.component';
import { AuthService } from 'src/app/login/auth.service';


@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  id: any;
  empleados: Empleado[] = [];


  // let datos = new LoginComponent().logout;


  constructor(public empleadoService: EmpleadoService, private authService: AuthService,
    private router: Router) { }

  ngOnInit(): void {
    this.empleadoService.getAll().subscribe((data: Empleado[])=>{
      this.empleados = data;
      console.log(this.empleados);
    })  
  }
     
  /**
   * Write code on Method
   *
   * @return response()
   */
  deleteEmpleado(id:number){
    this.empleadoService.delete(id).subscribe(res => {
         this.empleados = this.empleados.filter(item => item.id !== id);
         console.log('Post deleted successfully!');
    })
  }

  editEmpleado(id:number){
    this.router.navigateByUrl('empleado/' + id + '/edit');
  }
 

  logout(){
    console.log("Si llego hasta logout");
    this.authService.singout().subscribe((res:any) =>{
      localStorage.clear();

      this.router.navigate(['']);
  
    })
  }



}
