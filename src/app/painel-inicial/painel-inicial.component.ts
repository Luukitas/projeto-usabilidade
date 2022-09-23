import { Component, OnInit } from '@angular/core';
import { PainelInicialService } from "../services/painel-inicial-services/painel-inicial.service";
import { Consultas } from "../models/consultas";

@Component({
  selector: 'app-painel-inicial',
  templateUrl: './painel-inicial.component.html',
  styleUrls: ['./painel-inicial.component.css']
})
export class PainelInicialComponent implements OnInit {

  constructor(private painelInicialService: PainelInicialService) { }

  nomeUsuario: String = "Lucas"

  numero:any;

  consultas!: Consultas[];

  selected: Date | null | undefined;
  minDate: Date | null | undefined;

  listaItem = [
    {nome: "Consulta X"},
    {nome: "Consulta Y"},
    {nome: "Consulta Z"}
  ];

  // selecionado: Date | null;

  ngOnInit(): void {
    this.selected = new Date();
    this.minDate = this.selected;
    this.pesquisarConsulta();
  }

  pesquisarConsulta = () => {
    this.painelInicialService.getConsultas().subscribe((data: Consultas[]) =>{
      this.consultas = data;
    });
  }

}
