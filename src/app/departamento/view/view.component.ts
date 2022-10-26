import { Component, OnInit } from '@angular/core';
import { DepartamentoService } from '../departamento.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Departamento } from '../departamento';
import { AuthService } from 'src/app/login/auth.service';



@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {

  id!: number;
  departamento!: Departamento;

  constructor(public departamentoService: DepartamentoService,
    private route: ActivatedRoute,  private router: Router, private authService: AuthService
    ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['departamentoId'];

    this.departamentoService.find(this.id).subscribe((data: Departamento)=>{
      this.departamento = data;
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
