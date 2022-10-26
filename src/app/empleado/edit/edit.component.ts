import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Empleado } from '../empleado';
import { EmpleadoService } from '../empleado.service';
import { AuthService } from 'src/app/login/auth.service';


@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  id!: number;
  empleado!: Empleado;
  form!: FormGroup;

  constructor(  public empleadoService: EmpleadoService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService) { }

 

  /**
   * Write code on Method
   *
   * @return response()
   */
   ngOnInit(): void {
    this.id = this.route.snapshot.params['empleadoId'];
    this.empleadoService.find(this.id).subscribe((data: Empleado)=>{this.empleado = data;
    }); 

       
    this.form = new FormGroup({
      nombre: new FormControl('', [Validators.required]),
      apellido: new FormControl('', [Validators.required]),
      dpi: new FormControl('', [Validators.required]),
      id_departamento: new FormControl('', [Validators.required]),
      fecha_inicio_labores: new FormControl('', [Validators.required]),
      fecha_nacimiento: new FormControl('', [Validators.required])

    });
    

  }
     
  /**
   * Write code on Method
   *
   * @return response()
   */
  get f(){
    return this.form.controls;
  }
     
  /**
   * Write code on Method
   *
   * @return response()
   */
  onSubmit(){
    if (!this.form.valid) {
      return;
    }
    console.log(this.form.value);
    let empleado: Empleado = this.form.value;
    this.empleadoService.update(this.id, empleado).subscribe((res:any) => {
         console.log('Post updated successfully!');
         this.router.navigateByUrl('empleado/index');
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
