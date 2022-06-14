import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlunoCadastrarComponent } from './aluno/aluno-cadastrar/aluno-cadastrar.component';
import { AlunoPerfilComponent } from './aluno/aluno-perfil/aluno-perfil.component';
import { InstituicaoCadastroComponent } from './instituicao/instituicao-cadastro/instituicao-cadastro.component';
import { InstituicaoEditaComponent } from './instituicao/instituicao-edita/instituicao-edita.component';
import { AuthLoginService } from './aluno/autenticacao/auth-login.service';
import { CalendarioCadastroComponent } from './calendario/calendario-cadastro/calendario-cadastro.component';
import { DisciplinaCadastroComponent } from './disciplina/disciplina-cadastro/disciplina-cadastro.component';
import { DisciplinaEditaComponent } from './disciplina/disciplina-edita/disciplina-edita.component';
import { NotasComponent } from './disciplina/notas/notas.component';

const routes: Routes = [
{
  path: 'cadastroDisciplina',
  component: DisciplinaCadastroComponent
},
{
  path: 'disciplina/:id',
  component: DisciplinaEditaComponent
},
{
  path:'',
  component: DisciplinaCadastroComponent
},
{
  path: 'Nota',
  component: NotasComponent
}
];

const routes: Routes = [
  { path: '', component: AlunoCadastrarComponent},
  { path: 'perfilAluno/:id', component: AlunoPerfilComponent, canActivate: [AuthLoginService] },
  { path: 'instituicao/:id', component: InstituicaoEditaComponent, canActivate: [AuthLoginService] },
  { path: 'cadastrainstituicao', component: InstituicaoCadastroComponent, canActivate: [AuthLoginService] },
  { path: 'calendario', component: CalendarioCadastroComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
