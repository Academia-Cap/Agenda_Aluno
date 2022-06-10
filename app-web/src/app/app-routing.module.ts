import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlunoCadastrarComponent } from './aluno/aluno-cadastrar/aluno-cadastrar.component';
import { AlunoPerfilComponent } from './aluno/aluno-perfil/aluno-perfil.component';
import { InstituicaoCadastroComponent } from './instituicao/instituicao-cadastro/instituicao-cadastro.component';
import { InstituicaoEditaComponent } from './instituicao/instituicao-edita/instituicao-edita.component';
import { AuthLoginService } from './aluno/autenticacao/auth-login.service';


const routes: Routes = [
  { path: '', component: AlunoCadastrarComponent, canActivate: [AuthLoginService]},
  { path: 'home', component: AlunoCadastrarComponent, canActivate: [AuthLoginService] },
  { path: 'perfilAluno/:id', component: AlunoPerfilComponent, canActivate: [AuthLoginService] },
  { path: 'instituicao/:id', component: InstituicaoEditaComponent, canActivate: [AuthLoginService] },
  { path: 'cadastrainstituicao', component: InstituicaoCadastroComponent, canActivate: [AuthLoginService] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
