import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Departamento } from './departamento';

import {  Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DepartamentoService {

  // private apiURL = "http://192.168.1.30:7070/api/departamentos/";
  private apiURL = "http://10.8.0.5:8000/api/departamentos/";

  // private apiURL = "http://localhost:7070/api/departamentos/";

  // private apiURL = "http://192.168.1.24:8000/api/departamentos/";

  httpOptions = {
     headers: new HttpHeaders({
       'Content-Type': 'application/json'
     })
  }

  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<Departamento[]> {
   return this.httpClient.get<Departamento[]>(this.apiURL)
   .pipe(
     catchError(this.errorHandler)
   )
 }

 create(departamento: Departamento): Observable<Departamento> {
   return this.httpClient.post<Departamento>(this.apiURL, JSON.stringify(departamento), this.httpOptions)
   .pipe(
     catchError(this.errorHandler)
   )
 }

 find(id: number): Observable<Departamento> {
   return this.httpClient.get<Departamento>(this.apiURL + id)
   .pipe(
     catchError(this.errorHandler)
   )
 }

 update(id: number, departamento: Departamento): Observable<Departamento> {
   return this.httpClient.put<Departamento>(this.apiURL + id, JSON.stringify(departamento), this.httpOptions)
   .pipe(
     catchError(this.errorHandler)
   )
 }

 delete(id: number){
   return this.httpClient.delete<Departamento>(this.apiURL + id, this.httpOptions)
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
