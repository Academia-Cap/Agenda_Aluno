import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlunoCadastrarComponent } from './aluno/aluno-cadastrar/aluno-cadastrar.component';
import { AlunoPerfilComponent } from './aluno/aluno-perfil/aluno-perfil.component';
import { InstituicaoCadastroComponent } from './instituicao/instituicao-cadastro/instituicao-cadastro.component';
import { InstituicaoEditaComponent } from './instituicao/instituicao-edita/instituicao-edita.component';
import { LoginComponent } from './instituicao/login/login.component';
import { AuthLoginService } from './instituicao/autenticacao/auth-login.service';


const routes: Routes = [
  { path: '', component: AlunoCadastrarComponent },
  { path: 'home', component: AlunoCadastrarComponent },
  { path: 'perfilAluno/:id', component: AlunoPerfilComponent },
  { path: 'instituicao/:id', component: InstituicaoEditaComponent },
  { path: 'cadastrainstituicao', component: InstituicaoCadastroComponent, canActivate: [AuthLoginService] },
  { path: 'login', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
