import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlunoCadastrarComponent } from './aluno/aluno-cadastrar/aluno-cadastrar.component';
import { AlunoPerfilComponent } from './aluno/aluno-perfil/aluno-perfil.component';
import { InstituicaoCadastroComponent } from './instituicao/instituicao-cadastro/instituicao-cadastro.component';
import { AuthLoginService } from './aluno/aluno-servico/autenticacao/auth-login.service';
import { CalendarioCadastroComponent } from './calendario/calendario-cadastro/calendario-cadastro.component';
import { DisciplinaCadastroComponent } from './disciplina/disciplina-cadastro/disciplina-cadastro.component';
import { NotasComponent } from './nota/notas/notas.component';
import { InfoComponent } from './info/info.component';

const routes: Routes = [
  { path: '', component: AlunoCadastrarComponent },
  { path: 'perfilAluno/:id', component: AlunoPerfilComponent, canActivate: [AuthLoginService] },
  { path: 'cadastrainstituicao', component: InstituicaoCadastroComponent, canActivate: [AuthLoginService] },
  { path: 'calendario', component: CalendarioCadastroComponent, canActivate: [AuthLoginService] },
  { path: 'disciplina', component: DisciplinaCadastroComponent, canActivate: [AuthLoginService] },
  { path: 'nota', component: NotasComponent, canActivate: [AuthLoginService]},
  { path: 'info', component:InfoComponent, canActivate:[AuthLoginService]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }