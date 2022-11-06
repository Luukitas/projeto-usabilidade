import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConsultaComponent } from './components/consulta/cadastro-consulta/consulta.component';
import { DetalheConsultaComponent } from './components/consulta/detalhe-consulta/detalhe-consulta.component';
import { EditaConsultaComponent } from './components/consulta/edita-consulta/edita-consulta.component';
import { PainelInicialComponent } from './components/painel-inicial/painel-inicial.component';
import { LoginUsuarioComponent } from './components/usuarios/login/login-usuario/login-usuario.component';

const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: "login", component: LoginUsuarioComponent},
  {path: "cadastro-consulta", component: ConsultaComponent},
  {path: "painel-inicial", component: PainelInicialComponent},
  {path: "detalhe-consulta/:id", component: DetalheConsultaComponent},
  {path: "editar-consulta/:id", component: EditaConsultaComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
