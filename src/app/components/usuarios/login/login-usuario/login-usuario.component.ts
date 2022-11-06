import { Component, getNgModuleById } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import { Login } from 'src/app/models/login';
import { LoginService } from '../../../../services/login-services/login-service.service';


@Component({
  selector: 'app-login-usuario',
  templateUrl: './login-usuario.component.html',
  styleUrls: ['./login-usuario.component.css']
})
export class LoginUsuarioComponent {

  /* entrada!: any;
     valorEmail: string = "";
     valorSenha: string = ""; */

  login: any = {};

  constructor(public loginService: LoginService) { }

  fazerLogin = (entrada: any) => {

    // ler o resultado do botao
    // ler os dados armazenados
    // verificar se entre os dados armazenados está o que eu preciso
    // comparar o resultado do botao com o resultado do bd

    /* this.loginService.getUsuarios(entrada).subscribe((data: Login[]) => {
       this.login = data;
       console.log(this.login);
      });*/

      //pegar email e senha dos dados armazenados
  }
}
