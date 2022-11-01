import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {  Observable, throwError } from 'rxjs';

import { Registro } from './registro';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  // private apiURL = "http://192.168.1.30:7070/api";
  private apiURL = "http://10.8.0.5:8000/api";
  // private apiURL = "http://localhost:7070/api";

  // private apiURL = "http://192.168.1.24:8000/api";

  
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }


  constructor(private httpClient: HttpClient) { }

  registrouser(registro: Registro): Observable<Registro> {
  console.log(registro+"------------------");
    return this.httpClient.post<Registro>(this.apiURL + '/registro/', JSON.stringify(registro), this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
    
  }  

  errorHandler(error: any) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
      
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
 }
}
