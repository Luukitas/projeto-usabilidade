import { Component, OnInit } from '@angular/core';
import { PainelInicialService } from "../../services/painel-inicial-services/painel-inicial.service";
import { Consultas } from "../../models/consultas";
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-painel-inicial',
  templateUrl: './painel-inicial.component.html',
  styleUrls: ['./painel-inicial.component.css']
})
export class PainelInicialComponent implements OnInit {

  constructor(private painelInicialService: PainelInicialService, private route: ActivatedRoute, private router: Router) { }

  usuarioSelecionado: any;

  consultas?: Consultas[];
  mostrarVazio?:boolean;
  
  selected?: Date | null | undefined;
  minDate: Date | null | undefined = this.selected;
  
  dataHoje = {
    "data": this.selected
    // 'idade': 21
  }
  
  ngOnInit(): void {
    this.usuarioSelecionado = environment.login;
    
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

      this.consultas = this.consultas.sort(((a,b) => 0 - (a.hora > b.hora? -1 : 1)))

      if (this.consultas.length === 0) {
        this.mostrarVazio = true;
      }else{
        this.mostrarVazio = false;
      }
    });
  }

}
