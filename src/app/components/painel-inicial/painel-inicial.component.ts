import { Component, OnInit } from '@angular/core';
import { PainelInicialService } from "../../services/painel-inicial-services/painel-inicial.service";
import { Consultas } from "../../models/consultas";

@Component({
  selector: 'app-painel-inicial',
  templateUrl: './painel-inicial.component.html',
  styleUrls: ['./painel-inicial.component.css']
})
export class PainelInicialComponent implements OnInit {

  constructor(private painelInicialService: PainelInicialService) { }

  nomeUsuario: String = "Lucas"

  consultas!: Consultas[];
  mostrarVazio?:boolean;
  
  selected?: Date | null | undefined;
  minDate: Date | null | undefined = this.selected;
  
  dataHoje = {
    "data": this.selected
    // 'idade': 21
  }
  
  ngOnInit(): void {
    this.selected = new Date();
    this.pesquisarConsulta(this.dataHoje);
    
  }

  pesquisarConsulta = (entrada: any) => {
    entrada.data = this.selected;
    let dia = entrada.data.getDate();
    let mes = entrada.data.getMonth() + 1;
    let ano = entrada.data.getFullYear();
    let data = `${dia}/${mes}/${ano}`
    entrada.data = data;
    
    this.painelInicialService.getConsultas(entrada).subscribe((data: Consultas[]) =>{
      this.consultas = data;
      if (this.consultas.length === 0) {
        this.mostrarVazio = true;
      }else{
        this.mostrarVazio = false;
      }
      console.log(this.consultas);
    });
  }

}
