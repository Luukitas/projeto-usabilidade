import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Usuarios } from "src/app/models/usuarios";
import { UsuarioService } from 'src/app/services/usuarios-services/usuarios.service';

interface Usuario {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-cadastro-usuario',
  templateUrl: './cadastro-usuario.component.html',
  styleUrls: ['./cadastro-usuario.component.css']
})


export class CadastroUsuarioComponent {

  constructor(public usuarioService: UsuarioService) {}

  valorCpf: string = "";

  usuario!: Usuarios;

  usuarios: Usuario[] = [
    {value: 'medico-0', viewValue: 'Médico'},
    {value: 'recepcionista-1', viewValue: 'Recepcionista'},
  ];

  formatarCpf = () => {
    if (this.valorCpf.length === 3 || this.valorCpf.length === 7) {
      this.valorCpf = this.valorCpf + "."
    }if (this.valorCpf.length === 11) {
      this.valorCpf = this.valorCpf + "-"
    }
  }

  onCadastrarUsuario(form: NgForm) {
    if(form.invalid) {
      return;
    }
    this.usuarioService.cadastrarUsuario(
      form.value.nome,
      form.value.cpf,
      form.value.idade,
      form.value.crm,
      form.value.contato,
      form.value.email,
      form.value.senha,
      form.value.confirmarSenha,
      form.value.tipoUsuario
      );
    form.resetForm();
  }
}
