import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Consultas } from 'src/app/models/consultas';
import { ConsultaService } from 'src/app/services/consulta-services/consulta.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-edita-consulta',
  templateUrl: './edita-consulta.component.html',
  styleUrls: ['./edita-consulta.component.css']
})
export class EditaConsultaComponent implements OnInit {

  constructor(public datepipe: DatePipe, private consultaService: ConsultaService, private route: ActivatedRoute, private router: Router) { }

  valorNome: string = "";
  valorCpf:string = "";
  valorEmail:string = "";
  valorData:any;
  valorDescricao: string = "";
  id: any;
  entrada = {};
  
  consulta: any = {};
  
  ngOnInit(): void {
    // this.valorData = this.datepipe.transform(this.valorData, 'dd/MM/yyyy')
    const id = this.route.snapshot.paramMap.get('id');
    this.entrada = {
      _id: id
    };
    this.pesquisarConsulta(this.entrada)
  }

  formatarCpf = () => {
    if (this.valorCpf.length === 3 || this.valorCpf.length === 7) {
      this.valorCpf = this.valorCpf + "."
    }if (this.valorCpf.length === 11) {
      this.valorCpf = this.valorCpf + "-"
    }
  }

  mostrarValorData = () => {
    return this.datepipe.transform(this.valorData, 'dd/MM/yyyy')
    
  }

  cadastrarAgendamento = () => {
    let data = this.mostrarValorData();
    this.consulta = {
      "nome": this.valorNome,
      "email":this.valorEmail,
      "data": data,
      "cpf": this.valorCpf,
      "descricao": this.valorDescricao
    }

    this.consultaService.editarConsulta(this.id, this.consulta).subscribe((response) => {})
    this.router.navigate(['/painel-inicial'])

    
  }
  pesquisarConsulta = (entrada: any) => {
    this.consultaService.getConsulta(entrada).subscribe((data: Consultas[]) =>{
      this.consulta = data;
      this.valorNome = this.consulta.nome
      this.valorCpf = this.consulta.cpf
      this.valorEmail = this.consulta.email
      this.valorData = this.consulta.data
      this.valorDescricao = this.consulta.descricao
      this.id = this.consulta._id
      this.valorData = this.formatarData();
    });
  }

  formatarData = () => {
    let lista = this.valorData.split('/')
    console.log(lista);
    let dia = lista[0];
    let mes = lista[1];
    let ano = lista[2];
    return `${ano}-${mes}-${dia}`
  }

}
