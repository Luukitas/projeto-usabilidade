import { Usuarios } from "src/app/models/usuarios";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

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

  getListaDeUsuariosAtualizadaObservable() {
    return this.listaUsuariosAtualizada.asObservable();
  }
}
