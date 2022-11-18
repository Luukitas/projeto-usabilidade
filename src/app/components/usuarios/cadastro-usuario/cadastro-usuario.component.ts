import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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


export class CadastroUsuarioComponent implements OnInit {

  constructor(public usuarioService: UsuarioService, public router: Router) {}

  valorCpf: string = "";
  form!: FormGroup;
  erroSenha = false;

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

  ngOnInit(): void {
    this.form = new FormGroup({
      nome: new FormControl (null, {
        validators: [
          Validators.required,
          Validators.pattern("^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ' ]+$"),
          Validators.minLength(2)
        ]
      }),
      cpf: new FormControl (null, {
        validators: [
          Validators.required,
          Validators.minLength(14),
          Validators.maxLength(14)
        ]
      }),
      idade: new FormControl (null, {
        validators: [
          Validators.required,
          Validators.pattern("[0-9]+"),
          Validators.minLength(2),
          Validators.maxLength(2)
        ]
      }),
      tipoUsuario: new FormControl (null, {
        validators: [
          Validators.required
        ]
      }),
      contato: new FormControl (null, {
        validators: [
          Validators.pattern("[-()+0-9 ]+"),
          Validators.minLength(8),
          Validators.maxLength(19)
        ]
      }),
      crm: new FormControl (null, {
        validators: [
          Validators.pattern("[aA-zZ0-9/ ]+"),
          Validators.maxLength(13)
        ]
      }),
      email: new FormControl (null, {
        validators: [
          Validators.required,
          Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+[a-z]{2,4}")
        ]
      }),
      senha: new FormControl (null, {
        validators: [
          Validators.required,
          Validators.pattern("[aA-zZ0-9()-=@!#$%&*?]+")
        ]
      }),
      confirmarSenha: new FormControl (null, {
        validators: [
          Validators.required,
          Validators.pattern("[aA-zZ0-9()-=@!#$%&*?]+")
        ]
      })
    })
  }

  onCadastrarUsuario() {
    if(this.form.invalid) {
      return;
    }
    this.usuarioService.cadastrarUsuario(
      this.form.value.nome,
      this.form.value.cpf,
      this.form.value.idade,
      this.form.value.crm,
      this.form.value.contato,
      this.form.value.email,
      this.form.value.senha,
      this.form.value.confirmarSenha,
      this.form.value.tipoUsuario
      );
      if(this.form.value.senha === this.form.value.confirmarSenha) {
        this.form.reset();
        alert("Usuário cadastrado com sucesso!");
        this.router.navigate(["login"]);
      }
      if(this.form.value.senha !== this.form.value.confirmarSenha) {
        this.erroSenha = true;
        return;
      }
  }
}
