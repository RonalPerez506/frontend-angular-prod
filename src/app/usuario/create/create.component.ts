import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../usuario.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import Swal from 'sweetalert2';
import { AuthService } from 'src/app/login/auth.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  formm!: FormGroup;


  constructor(public usuarioService: UsuarioService,
    private router: Router, private authService: AuthService) { }

  ngOnInit(): void {

    this.formm = new FormGroup({
      usuario: new FormControl('', [Validators.required]),
      id_tipo_usuario: new FormControl('', [Validators.required]),
      id_empleado: new FormControl('', [Validators.required]),
      contrasena: new FormControl('', [Validators.required]),

    });
  }
  get f(){
    return this.formm.controls;
  }
       
    /**
     * Write code on Method
     *
     * @return response()
     */
  submit(){
    console.log(this.formm.value);
    this.usuarioService.registrouser(this.formm.value).subscribe((res:any) => {
         console.log('Usuario creado!');
         this.ok();
         this.router.navigateByUrl('empleado/index');
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
