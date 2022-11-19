import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Consultas } from 'src/app/models/consultas';
import { ConsultaService } from 'src/app/services/consulta-services/consulta.service';
import { environment } from 'src/environments/environment';
import { LoginService } from 'src/app/services/login-services/login-service.service';
import { Usuarios } from 'src/app/models/usuarios';
import { UsuarioService } from 'src/app/services/usuarios-services/usuarios.service';

@Component({
  selector: 'app-consulta',
  templateUrl: './consulta.component.html',
  styleUrls: ['./consulta.component.css']
})
export class ConsultaComponent implements OnInit {

  constructor(public datepipe: DatePipe, private consultaService: ConsultaService, private usuarioService: UsuarioService) { }

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
  
  consulta!: Consultas;
  
  ngOnInit(): void {
    this.usuarioSelecionado = environment.login;
    this.verificadorUsuario = this.usuarioSelecionado.tipoUsuario;
    if (this.verificadorUsuario === 2) {
      this.medicoSelecionado = this.usuarioSelecionado
    }
    console.log(this.usuarioSelecionado);
    
  }

  mostrarValorData = () => {
    return this.datepipe.transform(this.valorData, 'dd/MM/yyyy')
    
  }

  cadastrarAgendamento = () => {
    let data = this.mostrarValorData();
    this.consulta = {
      "paciente": this.pacienteSelecionado,
      "medico":this.medicoSelecionado,
      "data": data,
      "descricao": this.valorDescricao
    }
    
    this.consultaService.salvarConsulta(this.consulta).subscribe((response) => {

      console.log(response);
    })
    
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
      "tipoUsuario": 2
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
      "tipoUsuario": 0
    }
    
    this.usuarioService.getUsuarios(entrada).subscribe((data: Usuarios[]) => {
       this.listaMedicos = data;
       this.mostrarBuscaMedicos = true;
      });
  }

}
