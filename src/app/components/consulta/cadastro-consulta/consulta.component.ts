import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Consultas } from 'src/app/models/consultas';
import { ConsultaService } from 'src/app/services/consulta-services/consulta.service';
import { environment } from 'src/environments/environment';
import { Usuarios } from 'src/app/models/usuarios';
import { UsuarioService } from 'src/app/services/usuarios-services/usuarios.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-consulta',
  templateUrl: './consulta.component.html',
  styleUrls: ['./consulta.component.css']
})
export class ConsultaComponent implements OnInit {

  constructor(public datepipe: DatePipe, private consultaService: ConsultaService, private usuarioService: UsuarioService, private router: Router) { }

  valorNomePaciente: string = "";
  valorNomeMedico: string = "";
  valorData:any;
  valorDescricao: string = ""

  verificadorUsuario: any;
  pacienteSelecionado: any;
  medicoSelecionado: any;
  usuarioSelecionado!:Usuarios;
  mostrarBuscaPacientes: boolean = false;
  mostrarBuscaMedicos: boolean = false;

  listaPacientes!: Usuarios[]
  listaMedicos!: Usuarios[]

  deuErro = {
    verificador: false,
    mansagem: ""
  }
  
  consulta!: Consultas;
  
  ngOnInit(): void {
    this.usuarioSelecionado = environment.login;
    this.verificadorUsuario = this.usuarioSelecionado.tipoUsuario;
    if (this.verificadorUsuario === "0") {
      this.medicoSelecionado = this.usuarioSelecionado
    }
    
  }

  mostrarValorData = () => {
    return this.datepipe.transform(this.valorData, 'dd/MM/yyyy')
    
  }

  cadastrarAgendamento = () => {
    this.deuErro.verificador = false;
    this.deuErro.mansagem = ""

    if (!this.verificarCamposVazios()) {
      let data = this.mostrarValorData();
      this.consulta = {
        "paciente": JSON.stringify(this.pacienteSelecionado),
        "medico":JSON.stringify(this.medicoSelecionado),
        "data": data,
        "descricao": this.valorDescricao
      }
      this.consultaService.salvarConsulta(this.consulta).subscribe((response) => {})
      this.router.navigate(['/painel-inicial'])
    }
    
  }

  selecionar = (variavel:any, paciente: any) => {
    if (variavel === 1) {
      this.pacienteSelecionado = paciente
    }else{
      this.medicoSelecionado = paciente
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

  buscarMedico = () => {
    let entrada = {
      "nome": this.valorNomeMedico,
      "tipoUsuario": "0"
    }
    
    this.usuarioService.getUsuarios(entrada).subscribe((data: Usuarios[]) => {
       this.listaMedicos = data;
       this.mostrarBuscaMedicos = true;
      });
  }

  verificarCamposVazios = () => {
    if (this.pacienteSelecionado === null || this.pacienteSelecionado === undefined) {
      this.deuErro.verificador = true;
      this.deuErro.mansagem = "O campo paciente é obrigatório. Por favor, insira um paciente"
    }
    else if (this.medicoSelecionado === null || this.medicoSelecionado === undefined) {
      this.deuErro.verificador = true;
      this.deuErro.mansagem = "O campo médico é obrigatório. Por favor, insira um médico"
    }
    else if (this.valorData === "" || this.valorData === undefined) {
      this.deuErro.verificador = true;
      this.deuErro.mansagem = "O campo Data do Agendamento é obrigatório. Por favor, insira uma data para consulta"
    }

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });

    return this.deuErro.verificador
  }

}
