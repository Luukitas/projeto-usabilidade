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
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatNativeDateModule, MAT_DATE_LOCALE} from '@angular/material/core'
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { DetalheConsultaComponent } from './components/consulta/detalhe-consulta/detalhe-consulta.component';
import { EditaConsultaComponent } from './components/consulta/edita-consulta/edita-consulta.component';

@NgModule({
  declarations: [
    AppComponent,
    ConsultaComponent,
    PainelInicialComponent,
    DetalheConsultaComponent,
    EditaConsultaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatCardModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    DatePipe,
    {provide: MAT_DATE_LOCALE, useValue: 'pt-BR'},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
