import { Component, SimpleChanges } from '@angular/core';
import { environment } from 'src/environments/environment';
import { LoginService } from './services/login-services/login-service.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  textoBotao = "Sair";

  usuario = environment.login;
  verificador = 0
  nomeComponente: string = "";

  title = 'projeto-usabilidade';

  mostrarMenu: boolean = false;

  constructor(private loginService: LoginService){

  }

  ngOnInit(){
    this.loginService.mostrarMenuEmitter.subscribe(
      valor => this.mostrarMenu = valor
      
    )
  }

  pegarNome = (nome: any) => {
    this.nomeComponente = nome.constructor.name
  }
}
