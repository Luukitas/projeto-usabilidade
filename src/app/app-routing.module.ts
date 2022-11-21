import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConsultaComponent } from './components/consulta/cadastro-consulta/consulta.component';
import { DetalheConsultaComponent } from './components/consulta/detalhe-consulta/detalhe-consulta.component';
import { EditaConsultaComponent } from './components/consulta/edita-consulta/edita-consulta.component';
import { PainelInicialComponent } from './components/painel-inicial/painel-inicial.component';
import { LoginUsuarioComponent } from './components/usuarios/login/login-usuario/login-usuario.component';
import { CadastroUsuarioComponent } from './components/usuarios/cadastro-usuario/cadastro-usuario.component'
import { AuthGuardService } from './auth-guard.service';
import { MenuComponent } from './components/menu/menu.component';
import { CadastroPacienteComponent } from './components/usuarios/cadastro-paciente/cadastro-paciente.component';


const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: "login", component: LoginUsuarioComponent},
  {path: "cadastro-usuario", component: CadastroUsuarioComponent},
  {path: "cadastro-consulta", component: ConsultaComponent, canActivate: [AuthGuardService]},
  {path: "painel-inicial", component: PainelInicialComponent, canActivate: [AuthGuardService]},
  {path: "detalhe-consulta/:id", component: DetalheConsultaComponent, canActivate: [AuthGuardService]},
  {path: "editar-consulta/:id", component: EditaConsultaComponent, canActivate: [AuthGuardService]},
  {path: "menu", component: MenuComponent, canActivate: [AuthGuardService]},
  {path: "cadastro-paciente", component: CadastroPacienteComponent, canActivate: [AuthGuardService]},
  {path: "cadastro-paciente/:veioEditar", component: CadastroPacienteComponent, canActivate: [AuthGuardService]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
