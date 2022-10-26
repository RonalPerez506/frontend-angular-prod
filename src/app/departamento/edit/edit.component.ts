import { Component, OnInit } from '@angular/core';
import { DepartamentoService } from '../departamento.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { Departamento } from '../departamento';
import { AuthService } from 'src/app/login/auth.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  id!: number;
  departamentos!: Departamento;
  form!: FormGroup;

  constructor(
    public departamentoService: DepartamentoService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['departamentoId'];
    console.log("-----------------------------------------1"+this.id);
    this.departamentoService.find(this.id).subscribe((data: Departamento)=>{
      this.departamentos = data;
    });

    this.form = new FormGroup({
      nombre_depto:  new FormControl('', [ Validators.required, Validators.pattern('') ]),
      desc:  new FormControl('', [ Validators.required, Validators.pattern('') ])
    });

  }

  get f(){
    return this.form.controls;
  }

  submit(){
    console.log(this.form.value);

    this.departamentoService.update(this.id, this.form.value).subscribe(res => {
         console.log('Departamento actualizado!');
         this.router.navigateByUrl('departamento/index');
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
