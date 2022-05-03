import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AlunoPerfilComponent } from './aluno/aluno-perfil/aluno-perfil.component';
import { FormsModule, NgModel } from '@angular/forms';
import { AlunoEditarComponent } from './aluno/aluno-editar/aluno-editar.component';
import { AlunoCadastrarComponent } from './aluno/aluno-cadastrar/aluno-cadastrar.component';

@NgModule({
  declarations: [
    AppComponent,
    AlunoPerfilComponent,
    AlunoEditarComponent,
    AlunoCadastrarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
