import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConsultaComponent } from './consulta/consulta.component';
import { PainelInicialComponent } from './painel-inicial/painel-inicial.component';

const routes: Routes = [
  {path: "", component: PainelInicialComponent},
  {path: "agenda", component: ConsultaComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
