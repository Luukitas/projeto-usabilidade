import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuarios } from 'src/app/models/usuarios';
import { UsuarioService } from 'src/app/services/usuarios-services/usuarios.service';

@Component({
  selector: 'app-cadastro-paciente',
  templateUrl: './cadastro-paciente.component.html',
  styleUrls: ['./cadastro-paciente.component.css']
})
export class CadastroPacienteComponent implements OnInit {

  valorNomePaciente: string = "";
  mostrarBuscaPacientes: boolean = false;
  pacienteEncontrado: boolean = false;
  verificadorUsuario: any;
  veioEditar: any;
  id:any;
  textoBotao: string = "";
  textoCabecalho: string = "";

  pacienteSelecionado = {
    "nome": '',
    "cpf": '',
    "email": '',
    "idade": '',
    "crm": '',
    "contato": '',
    "senha": '',
    "confirmarSenha": '',
    "tipoUsuario": '2'
  };

  listaPacientes!: Usuarios[]

  deuErro = {
    verificador: false,
    mansagem: ""
  }

  constructor( private route: ActivatedRoute, private usuarioService: UsuarioService, private router: Router) { }

  ngOnInit(): void {
    this.veioEditar = this.route.snapshot.paramMap.get('veioEditar');
    if (this.veioEditar) {
      this.textoBotao = "Editar paciente"
      this.textoCabecalho = "Edição de paciente"
    }else{
      this.textoBotao = "Cadastrar paciente"
      this.textoCabecalho = "Cadastro de paciente"
    }
  }


  formatarCpf = () => {
    if (this.pacienteSelecionado.cpf.length === 3 || this.pacienteSelecionado.cpf.length === 7) {
      this.pacienteSelecionado.cpf = this.pacienteSelecionado.cpf + "."
    }if (this.pacienteSelecionado.cpf.length === 11) {
      this.pacienteSelecionado.cpf = this.pacienteSelecionado.cpf + "-"
    }
  }

  buscarPaciente = () => {
    let entrada = {
      "nome": this.valorNomePaciente,
      "tipoUsuario": "2"
    }
    
    this.usuarioService.getUsuarios(entrada).subscribe((data: Usuarios[]) => {
       this.listaPacientes = data;
       this.mostrarBuscaPacientes = true;
       console.log(this.listaPacientes);
       
      });
  }

  cadastrarUsuario = () => {
    this.deuErro.verificador = false;
    this.deuErro.mansagem = ""

    if (!this.verificarCamposVazios()) {

      if (this.veioEditar) {
        this.usuarioService.editarUsuario(this.id, this.pacienteSelecionado).subscribe((response) => {})
        alert('Paciente editado com sucesso')
      }else{
        this.usuarioService.cadastrarUsuario(
          this.pacienteSelecionado.nome,
          this.pacienteSelecionado.cpf,
          this.pacienteSelecionado.idade,
          this.pacienteSelecionado.crm,
          this.pacienteSelecionado.contato,
          this.pacienteSelecionado.email,
          this.pacienteSelecionado.senha,
          this.pacienteSelecionado.confirmarSenha,
          this.pacienteSelecionado.tipoUsuario
        )
        alert('Paciente cadastrado com sucesso')
      }
      this.router.navigate(['/painel-inicial'])

    }
  }

  selecionar = (variavel:any, paciente: any) => {
    if (variavel === 1) {
      this.id = paciente._id
      this.pacienteSelecionado = Object.assign({}, paciente)
      this.pacienteEncontrado = true;
    }
  }

  verificarCamposVazios = () => {
    if (this.pacienteSelecionado.nome === null || this.pacienteSelecionado.nome === "") {
      this.deuErro.verificador = true;
      this.deuErro.mansagem = "O campo Nome do Paciente é obrigatório."
    }
    else if (this.pacienteSelecionado.cpf === null || this.pacienteSelecionado.cpf === "") {
      this.deuErro.verificador = true;
      this.deuErro.mansagem = "O campo CPF é obrigatório."
    }
    else if (this.pacienteSelecionado.email === null || this.pacienteSelecionado.email === "") {
      this.deuErro.verificador = true;
      this.deuErro.mansagem = "O campo E-mail do Agendamento é obrigatório."
    }
    else if (this.pacienteSelecionado.idade === null || this.pacienteSelecionado.idade === "") {
      this.deuErro.verificador = true;
      this.deuErro.mansagem = "O campo Idade do Agendamento é obrigatório."
    }

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });

    return this.deuErro.verificador
  }

}
