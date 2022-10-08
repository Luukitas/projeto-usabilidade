import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConsultaComponent } from './components/consulta/cadastro-consulta/consulta.component';
import { PainelInicialComponent } from './components/painel-inicial/painel-inicial.component';

const routes: Routes = [
  {path: "", component: PainelInicialComponent},
  {path: "cadastro-consulta", component: ConsultaComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
