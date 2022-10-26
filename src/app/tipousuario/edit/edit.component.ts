import { Component, OnInit } from '@angular/core';
import { TipousuarioService } from '../tipousuario.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { Tipousuario } from '../tipousuario';
import { AuthService } from 'src/app/login/auth.service';


@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  id!: number;
  tipousuario!: Tipousuario;
  form!: FormGroup;

  constructor(
    public tipousuarioService: TipousuarioService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['tipousuarioId'];
    this.tipousuarioService.find(this.id).subscribe((data: Tipousuario)=>{
      this.tipousuario = data;
    });

    this.form = new FormGroup({
      nombre_tipo:  new FormControl('', [ Validators.required, Validators.pattern('') ])
    });

  }

  get f(){
    return this.form.controls;
  }

  submit(){
    console.log(this.form.value);

    this.tipousuarioService.update(this.id, this.form.value).subscribe(res => {
         console.log('tipo de usuario actualizado!');
         this.router.navigateByUrl('tipousuario/index');
    })
  }

  logout(){
    console.log("Si llego hasta logout");
    this.authService.singout().subscribe((res:any) =>{
      localStorage.clear();

      this.router.navigate(['']);
  
    })
  }
}
