import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
    
import {  Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
   
import { Control } from './control';
import Swal from 'sweetalert2';
import { Empleado } from '../empleado/empleado';

    
@Injectable({
  providedIn: 'root'
})
export class ControlService {
    
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

  getname(){
    return this.httpClient.get<Control[]>(this.apiURL + '/marcacionsjoin/')
    .pipe(
      catchError(this.errorHandler)
    )
  }
    
  getAll(): Observable<Control[]> {
   // return this.httpClient.get<Control[]>(this.apiURL + '/marcacions/')
   return this.httpClient.get<Control[]>(this.apiURL + '/marcacionsjoin2/')
    .pipe(
      catchError(this.errorHandler) 

    )
  }

    
  create(control: any): Observable<Control> {
    
    return this.httpClient.post<Control>(this.apiURL + '/marcacions/', JSON.stringify(control), this.httpOptions)
    .pipe(
      
      catchError(this.errorHandler)
    )
  }  
    
  find(id: number): Observable<Control> {
    return this.httpClient.get<Control>(this.apiURL + '/marcacions/' + id)
    .pipe(
      catchError(this.errorHandler)
    )
  }
    
  update(id: any, control: Control): Observable<Control> {
    return this.httpClient.put<Control>(this.apiURL + '/marcacions/' + id, JSON.stringify(control), this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }
    
  delete(id: number){
    return this.httpClient.delete<Control>(this.apiURL + '/marcacions/' + id, this.httpOptions)
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

  ok(){
          
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Your work has been saved',
      showConfirmButton: false,
      timer: 100
    })
    
  }

  error(){
        
    Swal.fire({
      position: 'top-end',
      icon: 'error',
      title: 'No existe usuario',
      showConfirmButton: false,
      timer: 1500
    })
    
  }
}