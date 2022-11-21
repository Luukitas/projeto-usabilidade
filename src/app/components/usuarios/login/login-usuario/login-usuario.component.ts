import { Component, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Login } from 'src/app/models/login';
import { LoginService } from '../../../../services/login-services/login-service.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-login-usuario',
  templateUrl: './login-usuario.component.html',
  styleUrls: ['./login-usuario.component.css']
})
export class LoginUsuarioComponent {

  entrada!: any;
  valorEmail: string = "";
  valorSenha: string = "";
  valorTipoUsuario: string = "";
  deuErro = false;
  erroNPermitido = false;

  login: any = {};

  constructor(public loginService: LoginService, public router: Router) { }

  fazerLogin = () => {

    this.deuErro = false;
    this.erroNPermitido = false;
    
    let entrada = {
      email: this.valorEmail,
      senha: this.valorSenha
    }
    if(this.valorTipoUsuario === "2") {
      this.erroNPermitido = true;
      return;
    }
    this.loginService.getUsuarios(entrada).subscribe((data: Login[]) => {
       this.login = data;
       if(this.login.length > 0) {
        environment.login = this.login[0];
        this.router.navigate(["painel-inicial"])
       }
       else {
        this.deuErro = true;
       }
      });
  }
}
