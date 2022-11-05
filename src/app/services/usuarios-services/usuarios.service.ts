import { Usuario } from "src/app/models/usuario";
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from "@angular/common/http";
import { retry, catchError, filter } from 'rxjs/operators';
import { Injectable } from "@angular/core";
import { Subject, Observable, throwError } from "rxjs";

@Injectable({ providedIn: 'root' })
export class UsuarioService {

  private usuarios: Usuario[] = [];
  private listaUsuariosAtualizada = new Subject<Usuario[]>();

  url: string = "http://localhost:8080/api/v1/usuarios"

  constructor(private httpClient: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  getUsuarios(entrada: Usuario): Observable<Usuario[]> {
    const params = new HttpParams({
      fromObject: entrada as any
    })
    return this.httpClient.get<Usuario[]>(this.url + '/' + entrada.id, {params: params})
    .pipe(
      retry(2),
      catchError(this.handleError)
      );
  }

  salvarUsuario = (usuario: Usuario) => {
    return this.httpClient.post<Usuario>(this.url, JSON.stringify(usuario), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  cadastrarUsuario(nome: string, cpf: string, idade: string, contato: string, crm: string, email: string, senha: string, tipoUsuario: string) {
    const usuario: Usuario = {
      nome: nome,
      cpf: cpf,
      idade: idade,
      crm: crm,
      contato: contato,
      email: email,
      senha: senha,
      tipoUsuario: tipoUsuario,
      id: null
    };
    this.httpClient.post <{mensagem: string, id: string}> (this.url, usuario).subscribe((dados) => {
      usuario.id = dados.id;
      this.usuarios.push(usuario);
      this.listaUsuariosAtualizada.next([...this.usuarios]);
  })
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
