import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {  Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
   
import { Empleado } from './empleado';
import Swal from 'sweetalert2';


@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {

  // private apiURL = "http://192.168.1.30:7070/api";
  // private apiURL = "http://10.8.0.5:7070/api";
  private apiURL = "http://localhost:7070/api";

  // private apiURL = "http://192.168.1.24:8000/api";

    
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
   
  constructor(private httpClient: HttpClient) { }
    
  getAll(): Observable<Empleado[]> {
    return this.httpClient.get<Empleado[]>(this.apiURL + '/empleados/')
    .pipe(
      catchError(this.errorHandler)
    )
  }
    
  create(empleado: Empleado): Observable<Empleado> {
    return this.httpClient.post<Empleado>(this.apiURL + '/empleados/', JSON.stringify(empleado), this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
    
  }  
    
  find(id: number): Observable<Empleado> {
    return this.httpClient.get<Empleado>(this.apiURL + '/empleados/' + id)
    .pipe(
      catchError(this.errorHandler)
    )
  }
    
  update(id: number, empleado: Empleado): Observable<Empleado> {
    return this.httpClient.put<Empleado>(this.apiURL + '/empleados/' + id, JSON.stringify(empleado), this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }
    
  delete(id: number){
    return this.httpClient.delete<Empleado>(this.apiURL + '/empleados/' + id, this.httpOptions)
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
