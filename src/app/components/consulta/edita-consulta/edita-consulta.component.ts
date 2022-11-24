import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Consultas } from 'src/app/models/consultas';
import { ConsultaService } from 'src/app/services/consulta-services/consulta.service';
import { environment } from 'src/environments/environment';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Usuarios } from 'src/app/models/usuarios';
import { UsuarioService } from 'src/app/services/usuarios-services/usuarios.service';

@Component({
  selector: 'app-edita-consulta',
  templateUrl: './edita-consulta.component.html',
  styleUrls: ['./edita-consulta.component.css']
})
export class EditaConsultaComponent implements OnInit {

  constructor(public datepipe: DatePipe, private consultaService: ConsultaService, private route: ActivatedRoute, private router: Router, private usuarioService: UsuarioService) { }

  valorNomePaciente: string = "";
  valorNomeMedico: string = "";
  valorData:any;
  valorHora: any;
  valorDescricao: string = ""
  id: any;
  entrada = {};

  verificadorUsuario: any;
  pacienteSelecionado: any;
  medicoSelecionado: any;
  usuarioSelecionado!:Usuarios;
  mostrarBuscaPacientes: boolean = false;
  mostrarBuscaMedicos: boolean = false;

  deuErro = {
    verificador: false,
    mansagem: ""
  }

  listaPacientes!: Usuarios[]
  listaMedicos!: Usuarios[]
  
  consulta: any = {};
  
  ngOnInit(): void {
    // this.valorData = this.datepipe.transform(this.valorData, 'dd/MM/yyyy')
    this.usuarioSelecionado = environment.login;
    const id = this.route.snapshot.paramMap.get('id');
    this.entrada = {
      _id: id
    };
    this.pesquisarConsulta(this.entrada)
  }

  mostrarValorData = () => {
    return this.datepipe.transform(this.valorData, 'dd/MM/yyyy')
    
  }

  cadastrarAgendamento = () => {
    if (!this.verificarCamposVazios()) {
      let data = this.mostrarValorData();
      this.consulta = {
        "paciente": JSON.stringify(this.pacienteSelecionado),
        "medico":JSON.stringify(this.medicoSelecionado),
        "data": data,
        "hora": this.valorHora,
        "descricao": this.valorDescricao
      }
  
      this.consultaService.editarConsulta(this.id, this.consulta).subscribe((response) => {})
      this.router.navigate(['/painel-inicial'])
    }
  }

  pesquisarConsulta = (entrada: any) => {
    
    this.consultaService.getConsulta(entrada).subscribe((data: Consultas[]) =>{
      this.consulta = data[0];
      
      this.pacienteSelecionado = this.consulta.paciente
      this.medicoSelecionado = this.consulta.medico
      this.valorData = this.consulta.data
      this.valorHora = this.consulta.hora
      this.valorDescricao = this.consulta.descricao
      this.id = this.consulta._id
      this.valorData = this.formatarData();
    });
  }

  formatarData = () => {
    let lista = this.valorData.split('/')
    let dia = lista[0];
    let mes = lista[1];
    let ano = lista[2];
    return `${ano}-${mes}-${dia}`
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
