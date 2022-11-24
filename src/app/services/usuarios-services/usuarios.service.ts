import { Usuarios } from "src/app/models/usuarios";
import { HttpClient, HttpErrorResponse, HttpParams } from "@angular/common/http";
import { retry, catchError } from 'rxjs/operators';
import { Subject, Observable, throwError } from "rxjs";
import { EventEmitter, Injectable } from '@angular/core';
import { environment } from "../../../environments/environment";
import { Router } from "@angular/router";

@Injectable({ providedIn: 'root' })
export class UsuarioService {

  private usuarios: Usuarios[] = [];
  private listaUsuariosAtualizada = new Subject<Usuarios[]>();

  url: string = "http://localhost:8080/api/v1/usuarios"

  constructor(private httpClient: HttpClient) { }

  cadastrarUsuario(nome: string, cpf: string, idade: string, crm: string, contato: string, email: string, senha: string, confirmarSenha: string, tipoUsuario: string) {
    const usuario: Usuarios = {
      nome: nome,
      cpf: cpf,
      idade: idade,
      crm: crm,
      contato: contato,
      email: email,
      senha: senha,
      confirmarSenha: confirmarSenha,
      tipoUsuario: tipoUsuario,
      id: null
    };
    this.httpClient.post <{id: string}> (this.url, usuario).subscribe((dados) => {
      usuario.id = dados.id;
      this.usuarios.push(usuario);
      this.listaUsuariosAtualizada.next([...this.usuarios]);
    })
  }

  getUsuarios(entrada: Usuarios): Observable<Usuarios[]> {
    const params = new HttpParams({
      fromObject: entrada as any
    })
    return this.httpClient.get<Usuarios[]>(this.url + '/buscar-parte', {params: params})
    .pipe(
      retry(2),
      catchError(this.handleError)
      );

    // return dados;
  }

  getListaDeUsuariosAtualizadaObservable() {
    return this.listaUsuariosAtualizada.asObservable();
  }


  editarUsuario(id: any, entrada: Usuarios): Observable<Usuarios[]> {
    const params = new HttpParams({
      fromObject: entrada as any
    })
    
    
    return this.httpClient.put<Usuarios[]>(this.url + '/' + id, JSON.stringify(entrada), {params: params})
    .pipe(
      retry(0),
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
