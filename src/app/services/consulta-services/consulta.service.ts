import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { retry, catchError, filter } from 'rxjs/operators';
import { Consultas } from "../../models/consultas";

@Injectable({
  providedIn: 'root'
})
export class ConsultaService {

  constructor(private httpClient: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  url:string = "http://localhost:8080/api/v1/consultas"

  salvarConsulta = (consulta:Consultas) => {
    return this.httpClient.post<Consultas>(this.url, JSON.stringify(consulta), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  getConsulta(entrada: Consultas): Observable<Consultas[]> {
    const params = new HttpParams({
      fromObject: entrada as any
    })
    
    return this.httpClient.get<Consultas[]>(this.url + '/' + entrada._id, {params: params})
    .pipe(
      retry(2),
      catchError(this.handleError)
      );
  }

  editarConsulta(id: any, entrada: Consultas): Observable<Consultas[]> {
    const params = new HttpParams({
      fromObject: entrada as any
    })
    
    return this.httpClient.put<Consultas[]>(this.url + '/' + id, JSON.stringify(entrada), {params: params})
    .pipe(
      retry(1),
      catchError(this.handleError)
      );
  }

  deleteConsulta(entrada: Consultas): Observable<Consultas[]> {
    const params = new HttpParams({
      fromObject: entrada as any
    })
    
    return this.httpClient.delete<Consultas[]>(this.url + '/' + entrada._id, {params: params})
    .pipe(
      retry(1),
      catchError(this.handleError)
      );
  }

  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Erro ocorreu no lado do client
      errorMessage = error.error.message;
    } else {
      // Erro ocorreu no lado do servidor
      errorMessage = `Código do erro: ${error.status}, ` + `menssagem: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  };
}
