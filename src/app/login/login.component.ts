import { Component, Inject, Injectable, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { AuthService } from './auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  bandera: number | undefined;
  user = {
    usuario: "2021",
    pass: "123456"
  }


  constructor(
    private authService: AuthService,
    private router: Router
  ) {


  }



  ngOnInit(): void {
  }



  login() {
    console.log(this.user);
    this.authService.singin(this.user).subscribe((res: any) => {
      console.log(res);
      localStorage.setItem('token', res.access_token);

      if(res.mensaje=="usuario no existe"){
        this.errorloginuser();
      }
      // this.router.navigate(['empleado']);
      if (res.access_token == null) {
        console.log('error en validacion token null')
        this.errorlogin();
      } else {

        //*************************************************************************/
        this.authService.vperfil().subscribe((res: any) => {
          //console.log(res);
          if (res.id_tipo_usuario == 1) {
            console.log("es Admin");
            //admin
            this.bandera = 1;
          } else {
            //user
            console.log("es User");
            this.bandera = 2
          }
          if (this.bandera == 1) {
            console.log("entro a admin")
            this.router.navigate(['/empleado/index/']);
          } else {
            console.log("entro a user")
            this.router.navigate(['/control/create/']);
          }
          //console.log("esta es la bandera" + this.bandera);
        })
        //***************************************************** */
      }
    })
  }


  logout() {
    console.log("Si llego hasta logout");
    this.authService.singout().subscribe((res: any) => {
      localStorage.clear();
      this.router.navigate(['']);
    })
  }


  errorlogin() {
    Swal.fire({
      position: 'top-end',
      icon: 'error',
      title: 'credenciales incorrectas',
      showConfirmButton: false,
      timer: 1000
    })
  }

  errorloginuser() {
    Swal.fire({
      position: 'top-end',
      icon: 'error',
      title: 'usuario no registrado',
      showConfirmButton: false,
      timer: 1000
    })
  }

  //se consume el perfil para eterminar a donde se dirije
  validaperfil() {
    this.authService.vperfil().subscribe((res: any) => {
      console.log(res);
      if (res.id_tipo_usuario == 1) {
        console.log("es Admin");
        //admin
        this.bandera = 1;
      } else {
        //user
        console.log("es User");
        this.bandera = 2
      }
      console.log("esta es la bandera" + this.bandera);

    })
  }


}
