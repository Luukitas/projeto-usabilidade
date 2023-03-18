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
  valorTelefone: string = "";
  form!: FormGroup;
  erroSenha = false;
  indicadorSlide: number = 0;


  deuErro = {
    verificador: false,
    mansagem: ""
  }

  usuario!: Usuarios;

  usuarios: Usuario[] = [
    {value: '0', viewValue: 'Médico(a)'},
    {value: '1', viewValue: 'Recepcionista'},
    {value: '3', viewValue: 'Enfermeiro(a)'}
  ];

  formatarCpf = (event:any) => {
    this.formatarCampoNumerico(event)
    if (this.valorCpf.length === 3 || this.valorCpf.length === 7) {
      this.valorCpf = this.valorCpf + "."
    }if (this.valorCpf.length === 11) {
      this.valorCpf = this.valorCpf + "-"
    }
    
  }

  ngOnInit(): void {
    console.log(this.indicadorSlide);
    
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
          Validators.pattern("[aA-zZ0-9()-=@!#$%&*?]+"),
          Validators.minLength(5)
        ]
      }),
      confirmarSenha: new FormControl (null, {
        validators: [
          Validators.required,
          Validators.pattern("[aA-zZ0-9()-=@!#$%&*?]+"),
          Validators.minLength(5)
        ]
      })
    })
  }

  onCadastrarUsuario() {
    this.deuErro.verificador = false;
    this.deuErro.mansagem = ""
    if (!this.validarCamposObrigatorios()) {

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

  formatarCampoTelefone = (event:any) => {
    this.formatarCampoNumerico(event);
    if (this.valorTelefone.length === 1) {
      this.valorTelefone = "(" + this.valorTelefone
    }
    if (this.valorTelefone.length === 3) {
      this.valorTelefone = this.valorTelefone + ") "
    }
    if (this.valorTelefone.length === 10) {
      this.valorTelefone = this.valorTelefone + "-"
    }
  }

  formatarCampoNumerico = (event:any) => {
    
    var permitido = false;
    
    if(event.keyCode > 47 && event.keyCode < 58){
        permitido = true;
    }
    if (!permitido) {
        event.preventDefault();
    }
  }

  validarCamposObrigatorios = () => {
    let mensagem = "";

    if (this.form.value.nome === null || this.form.value.nome === "") {
      mensagem = "O campo Nome é obrigatório"
      this.deuErro.verificador = true;
    }
    else if (this.form.value.cpf === "" || this.form.value.cpf === "") {
      mensagem = "O campo CPF é obrigatório"
      this.deuErro.verificador = true;
    }
    else if (this.form.value.idade === null || this.form.value.idade === "") {
      mensagem = "O campo Idade é obrigatório"
      this.deuErro.verificador = true;
    }
    else if (this.form.value.tipoUsuario === null || this.form.value.tipoUsuario === "") {
      mensagem = "O campo Ocupação é obrigatório"
      this.deuErro.verificador = true;
    }
    else if (this.form.value.contato === null || this.form.value.contato === "") {
      mensagem = "O campo Contato é obrigatório"
      this.deuErro.verificador = true;
    }
    else if (this.form.value.crm === null || this.form.value.crm === "") {
      mensagem = "O campo CRM é obrigatório"
      this.deuErro.verificador = true;
    }
    else if (this.form.value.email === null || this.form.value.email === "") {
      mensagem = "O campo E-mail é obrigatório"
      this.deuErro.verificador = true;
    }
    else if (this.form.value.senha === null || this.form.value.senha === "") {
      mensagem = "O campo Senha é obrigatório"
      this.deuErro.verificador = true;
    }
    else if (this.form.value.confirmarSenha === null || this.form.value.confirmarSenha === "") {
      mensagem = "Por favor, confirme sua senha"
      this.deuErro.verificador = true;
    }

    this.deuErro.mansagem = mensagem

    return this.deuErro.verificador
  }

  controlarSlide = (valor: string) =>{
    console.log(this.indicadorSlide);
    if (valor === "avancar") {
      this.indicadorSlide = this.indicadorSlide + 1;
    }else if (valor === "voltar") {
      this.indicadorSlide = this.indicadorSlide - 1;
    }
    console.log(this.indicadorSlide);
  }
}
