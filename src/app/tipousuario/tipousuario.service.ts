import { Injectable } from '@angular/core';
import { Tipousuario } from './tipousuario';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import {  Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TipousuarioService {

  // private apiURL = "http://192.168.1.30:7070/api/tipo_usuarios/";
  // private apiURL = "http://10.8.0.5:7070/api/tipo_usuarios/";
  private apiURL = "http://localhost:7070/api/tipo_usuarios/";

  // private apiURL = "http://192.168.1.24:8000/api/tipo_usuarios/";


  httpOptions = {
     headers: new HttpHeaders({
       'Content-Type': 'application/json'
     })
  }

  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<Tipousuario[]> {
   return this.httpClient.get<Tipousuario[]>(this.apiURL)
   .pipe(
     catchError(this.errorHandler)
   )
 }

 create(tipousuario: Tipousuario): Observable<Tipousuario> {
   return this.httpClient.post<Tipousuario>(this.apiURL, JSON.stringify(tipousuario), this.httpOptions)
   .pipe(
     catchError(this.errorHandler)
   )
 }

 find(id: number): Observable<Tipousuario> {
   return this.httpClient.get<Tipousuario>(this.apiURL + id)
   .pipe(
     catchError(this.errorHandler)
   )
 }

 update(id: number, tipousuario: Tipousuario): Observable<Tipousuario> {
   return this.httpClient.put<Tipousuario>(this.apiURL + id, JSON.stringify(tipousuario), this.httpOptions)
   .pipe(
     catchError(this.errorHandler)
   )
 }

 delete(id: number){
   return this.httpClient.delete<Tipousuario>(this.apiURL + id, this.httpOptions)
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
