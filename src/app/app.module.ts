import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
   
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ControlModule } from './control/control.module';
import { EmpleadoModule } from './empleado/empleado.module';
import { DepartamentoModule } from './departamento/departamento.module';
import { TipousuarioModule } from './tipousuario/tipousuario.module';
import { UsuarioModule } from './usuario/usuario.module';


import { LoginComponent } from './login/login.component';


//se agrega modulo para toma de datos (como inyeccion )
import {FormsModule} from '@angular/forms'
import { TokenInterceptorService } from './services/token-interceptor.service';

//tmer
import { BnNgIdleService } from 'bn-ng-idle';
//url
// import { HashLocationStrategy,LocationStrategy } from '@angular/common';

//Social Login

import { SocialLoginModule, SocialAuthServiceConfig } from 'angularx-social-login';
import {
  GoogleLoginProvider,
  FacebookLoginProvider
} from 'angularx-social-login';


//


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ControlModule,
    EmpleadoModule,
    DepartamentoModule,
    TipousuarioModule,
    HttpClientModule,
    UsuarioModule,
    //modulo de forms
    FormsModule,
    SocialLoginModule
    
  ],
  providers: [
    
    //Token Interceptor
    {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptorService, multi:true},
    //timer
    BnNgIdleService,
    //rutas
    // {provide:LocationStrategy,useClass:HashLocationStrategy}

    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              // '372832709126-kv3cmi52e01l0cnkb3a98v079vtdqsg9.apps.googleusercontent.com'
              '877683543318-lovch9qriumog4p7me6snq8p85dp43i5.apps.googleusercontent.com'
            )
          },
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider('1331252287613554')
          }
        ],
        onError: (err) => {
          console.error(err);
        }
      } as SocialAuthServiceConfig,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { 


  
}


