import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AlunoComponent } from './aluno/aluno.component';
import { AulaComponent } from './aula/aula.component';
import { EscolaComponent } from './escola/escola.component';
import { DiciplinaComponent } from './diciplina/cadastro/diciplina/diciplina.component';
import { CadastroDiciplinaComponent } from './diciplina/cadastro-diciplina/cadastro-diciplina.component';
import { JanelaDiciplinaComponent } from './diciplina/janela-diciplina/janela-diciplina.component';

@NgModule({
  declarations: [
    AppComponent,
    AlunoComponent,
    AulaComponent,
    EscolaComponent,
    DiciplinaComponent,
    CadastroDiciplinaComponent,
    JanelaDiciplinaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
