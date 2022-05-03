import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AlunoComponent } from './aluno/aluno.component';
import { AulaComponent } from './aula/aula.component';
import { EscolaComponent } from './escola/escola.component';

@NgModule({
  declarations: [
    AppComponent,
    AlunoComponent,
    AulaComponent,
    EscolaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
