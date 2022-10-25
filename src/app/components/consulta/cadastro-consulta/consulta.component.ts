import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Consultas } from 'src/app/models/consultas';
import { ConsultaService } from 'src/app/services/consulta-services/consulta.service';
import {MatDatepickerModule} from '@angular/material/datepicker';

@Component({
  selector: 'app-consulta',
  templateUrl: './consulta.component.html',
  styleUrls: ['./consulta.component.css']
})
export class ConsultaComponent implements OnInit {

  constructor(public datepipe: DatePipe, private consultaService: ConsultaService) { }

  valorNome: string = "";
  valorCpf:string = "";
  valorEmail:string = "";
  valorData:any;
  valorDescricao: string = ""
  
  consulta!: Consultas;
  
  ngOnInit(): void {
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

    this.consultaService.salvarConsulta(this.consulta).subscribe((response) => {
      console.log(response);
    })
    
  }

}
