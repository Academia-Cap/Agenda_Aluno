import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AlunoPerfilComponent } from './aluno/aluno-perfil/aluno-perfil.component';
import { AlunoCadastrarComponent } from './aluno/aluno-cadastrar/aluno-cadastrar.component';
import { CurrencyMaskModule } from "ng2-currency-mask";
import { InstituicaoCadastroComponent } from './instituicao/instituicao-cadastro/instituicao-cadastro.component';
import { InstituicaoEditaComponent } from './instituicao/instituicao-edita/instituicao-edita.component';
import { NgxMaskModule, IConfig } from 'ngx-mask';
import { CalendarioCadastroComponent } from './calendario/calendario-cadastro/calendario-cadastro.component';
import {NgbDate, NgbCalendar, NgbDateParserFormatter, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {NgbPaginationModule, NgbAlertModule} from '@ng-bootstrap/ng-bootstrap';
import { DisciplinaCadastroComponent } from './disciplina/disciplina-cadastro/disciplina-cadastro.component';
import { DisciplinaEditaComponent } from './disciplina/disciplina-edita/disciplina-edita.component';
import { NotasComponent } from './disciplina/notas/notas.component';
import { DropComponent } from './drop/drop.component';


@NgModule({
  declarations: [
    AppComponent,
    AlunoPerfilComponent,
    AlunoCadastrarComponent,
    InstituicaoCadastroComponent,
    InstituicaoEditaComponent,
    CalendarioCadastroComponent,
    DisciplinaCadastroComponent,
    DisciplinaEditaComponent,
    NotasComponent,
    DropComponent,
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    CurrencyMaskModule,
    NgxMaskModule.forRoot(),
    NgbModule,
    NgbPaginationModule, 
    NgbAlertModule
           
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
