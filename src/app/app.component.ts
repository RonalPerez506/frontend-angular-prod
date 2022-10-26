import { Component, Directive } from '@angular/core';
import Swal from 'sweetalert2';

//timer
import { BnNgIdleService } from 'bn-ng-idle';
import { AuthService } from './login/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
  
})
export class AppComponent {
  title = 'ControlDePersonal';
 
  //router: any;
  //private router: Router

  //timer el constructor esta vacio 
  constructor(private bnIdle: BnNgIdleService,private authService: AuthService,private router: Router){
    
    this.bnIdle.startWatching(60).subscribe((res) => {
      if(res) {
          console.log("session expired");
         
            console.log("Si llego hasta logout despues de 30 segundos ");
            this.authService.singout().subscribe((res:any) =>{
              localStorage.clear();
        
              this.router.navigate(['']);
          
            })
          
      }
    })

  }

  marcar(){
    document.location.assign('/control/create/');
  }

  login(){
    document.location.assign('/control/index/');
  }

  showModal(){
    Swal.fire({
      title: 'Error!',
      text: 'Do you want to continue',
      icon: 'error',
      confirmButtonText: 'Cool'
    })
  }
}
