import { Component, OnInit } from '@angular/core';
import { EmpleadoService } from '../empleado.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/login/auth.service';


import { Empleado } from '../empleado';


@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {

  id!: number;
  empleado!: Empleado;

  constructor(public empleadoService: EmpleadoService,
    private route: ActivatedRoute,  private router: Router,
    private authService: AuthService
    ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['empleadoId'];

    this.empleadoService.find(this.id).subscribe((data: Empleado)=>{
      this.empleado = data;
    }); 

    
  }

  logout(){
    console.log("Si llego hasta logout");
    this.authService.singout().subscribe((res:any) =>{
      localStorage.clear();

      this.router.navigate(['']);
  
    })
  }
}
