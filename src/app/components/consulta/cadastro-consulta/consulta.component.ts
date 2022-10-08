import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-consulta',
  templateUrl: './consulta.component.html',
  styleUrls: ['./consulta.component.css']
})
export class ConsultaComponent implements OnInit {

  constructor(public datepipe: DatePipe) { }

  valorCpf:string = "";
  valorData:any;

  ngOnInit(): void {
    // this.valorData = this.datepipe.transform(this.valorData, 'dd/MM/yyyy')
  }

  formatarCpf = () => {
    if (this.valorCpf.length === 3 || this.valorCpf.length === 7) {
      this.valorCpf = this.valorCpf + "."
    }if (this.valorCpf.length === 11) {
      this.valorCpf = this.valorCpf + "-"
    }
  }

  mostrarValorData = () => {
    this.valorData = this.datepipe.transform(this.valorData, 'dd/MM/yyyy')
    console.log(this.valorData);
    
  }

}
