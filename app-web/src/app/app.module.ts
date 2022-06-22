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
import { NgxMaskModule, IConfig } from 'ngx-mask';
import { CalendarioCadastroComponent } from './calendario/calendario-cadastro/calendario-cadastro.component';
import {NgbDate, NgbCalendar, NgbDateParserFormatter, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {NgbPaginationModule, NgbAlertModule} from '@ng-bootstrap/ng-bootstrap';
import { DisciplinaCadastroComponent } from './disciplina/disciplina-cadastro/disciplina-cadastro.component';
import { NotasComponent } from './nota/notas/notas.component';
import { DropComponent } from './drop/drop.component';
import { AlunoAlterarsenhaComponent } from './aluno/aluno-alterarsenha/aluno-alterarsenha.component';
import { InfoComponent } from './info/info.component';


@NgModule({
  declarations: [
    AppComponent,
    AlunoPerfilComponent,
    AlunoCadastrarComponent,
    InstituicaoCadastroComponent,
    CalendarioCadastroComponent,
    DisciplinaCadastroComponent,
    NotasComponent,
    DropComponent,
    AlunoAlterarsenhaComponent,
    InfoComponent,
  
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
