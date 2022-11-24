import { Component, OnInit } from '@angular/core';
import { ConsultaService } from 'src/app/services/consulta-services/consulta.service';
import { Consultas } from 'src/app/models/consultas';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';


@Component({
  selector: 'app-detalhe-consulta',
  templateUrl: './detalhe-consulta.component.html',
  styleUrls: ['./detalhe-consulta.component.css']
})
export class DetalheConsultaComponent implements OnInit {

  consulta: any = {}
  entrada!: any;

  constructor(private consultaService: ConsultaService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.entrada = {
      _id: id
    };
    this.pesquisarConsulta(this.entrada)
  }

  pesquisarConsulta = (entrada: any) => {
    this.consultaService.getConsulta(entrada).subscribe((data: Consultas[]) =>{
      this.consulta = data[0];
      
    });
  }

  cancelarConsuta = (entrada: any) => {
    this.consultaService.deleteConsulta(entrada).subscribe(() =>{});
    this.router.navigate(['/painel-inicial'])
  }

}
