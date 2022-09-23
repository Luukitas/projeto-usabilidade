import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Consultas } from "../../models/consultas";

@Injectable({
  providedIn: 'root'
})
export class PainelInicialService {

  constructor(private http:HttpClient) { }

  dataUrl = "http://localhost:8080/api/v1/consultas"

  getConsultas(): Observable<Consultas[]> {
    return this.http.get<Consultas[]>(this.dataUrl)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  //Manipulação de erros
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
