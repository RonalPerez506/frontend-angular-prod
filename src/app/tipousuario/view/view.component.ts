import { Component, OnInit } from '@angular/core';
import { TipousuarioService } from '../tipousuario.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Tipousuario } from '../tipousuario';
import { AuthService } from 'src/app/login/auth.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {

  id!: number;
  tipousuario!: Tipousuario;

  constructor(public tipousuarioService: TipousuarioService,
    private route: ActivatedRoute,  private router: Router, private authService: AuthService
    ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['tipousuarioId'];

    this.tipousuarioService.find(this.id).subscribe((data: Tipousuario)=>{
      this.tipousuario = data;
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
