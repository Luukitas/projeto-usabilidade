import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ConsultaComponent } from './components/consulta/cadastro-consulta/consulta.component';
import { PainelInicialComponent } from './components/painel-inicial/painel-inicial.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatCardModule} from '@angular/material/card';
import {MatNativeDateModule} from '@angular/material/core'
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { DetalheConsultaComponent } from './components/consulta/detalhe-consulta/detalhe-consulta.component';

@NgModule({
  declarations: [
    AppComponent,
    ConsultaComponent,
    PainelInicialComponent,
    DetalheConsultaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatCardModule,
    MatNativeDateModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
