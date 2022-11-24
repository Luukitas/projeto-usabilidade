import { Login } from "src/app/models/login";
import { HttpClient, HttpErrorResponse, HttpParams } from "@angular/common/http";
import { retry, catchError } from 'rxjs/operators';
import { Subject, Observable, throwError } from "rxjs";
import { EventEmitter, Injectable } from '@angular/core';
import { environment } from "../../../environments/environment";
import { Router } from "@angular/router";


@Injectable({
  providedIn: 'root'
})

export class LoginService {

  mostrarMenuEmitter = new EventEmitter<boolean>();

  private usuario: Login[] = [];
  private listaUsuariosAtualizada = new Subject<Login[]>();
  url: string = "http://localhost:8080/api/v1/usuarios"

  constructor(private httpClient: HttpClient, private router:Router) { }

  getUsuarios(entrada: Login): Observable<Login[]> {
    const params = new HttpParams({
      fromObject: entrada as any
    })
    let dados =  this.httpClient.get<Login[]>(this.url, {params: params})
    .pipe(
      retry(2),
      catchError(this.handleError)
      );
    

    if (dados !== null) {
      this.mostrarMenuEmitter.emit(true);
    }else{
      this.mostrarMenuEmitter.emit(true);
    }

    return dados;
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
