import { Component, OnInit } from '@angular/core';
import { TipousuarioService } from '../tipousuario.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { AuthService } from 'src/app/login/auth.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  form!: FormGroup;

  constructor(
    public tipousuarioService: TipousuarioService,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {

    this.form = new FormGroup({
      nombre_tipo:  new FormControl('', [ Validators.required, Validators.pattern("")])
      


    });

  }

  get f(){
    return this.form.controls;
  }

  submit(){
    console.log(this.form.value);
    this.tipousuarioService.create(this.form.value).subscribe(res => {
         console.log('Tipo de usuario creado!');
         this.ok();
         this.router.navigateByUrl('tipousuario/index');
    })
  }

  ok(){
        
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Empleado agregado',
      showConfirmButton: false,
      timer: 800
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
