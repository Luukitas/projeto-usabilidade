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
  deuErro = false;

  login: any = {};

  constructor(public loginService: LoginService, public router: Router) { }

  fazerLogin = () => {
    let entrada = {
      email: this.valorEmail,
      senha: this.valorSenha
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
