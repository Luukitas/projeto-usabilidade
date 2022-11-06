import { Usuarios } from "src/app/models/usuarios";
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from "@angular/common/http";
import { retry, catchError, filter } from 'rxjs/operators';
import { Subject, Observable, throwError } from "rxjs";
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class LoginService {

  private usuarios: Usuarios[] = [];
  private listaUsuariosAtualizada = new Subject<Usuarios[]>();
  url: string = "http://localhost:8080/api/v1/usuarios"

  constructor(private httpClient: HttpClient) { }

  getUsuarios(entrada: Usuarios): Observable<Usuarios[]> {
    const params = new HttpParams({
      fromObject: entrada as any
    })
    return this.httpClient.get<Usuarios[]>(this.url + '/' + entrada.id, {params: params})
    .pipe(
      retry(2),
      catchError(this.handleError)
      );
  }

  getListaDeUsuariosAtualizadaObservable() {
    return this.listaUsuariosAtualizada.asObservable();
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
