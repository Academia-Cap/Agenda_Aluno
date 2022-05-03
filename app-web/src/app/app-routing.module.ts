import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlunoCadastrarComponent } from './aluno/aluno-cadastrar/aluno-cadastrar.component';
import { AlunoEditarComponent } from './aluno/aluno-editar/aluno-editar.component';
import { AlunoPerfilComponent } from './aluno/aluno-perfil/aluno-perfil.component';

const routes: Routes = [
  { path: 'cadastrarAluno', component: AlunoCadastrarComponent },
  { path: 'editarAluno', component: AlunoEditarComponent },
  { path: 'perfilAluno', component: AlunoPerfilComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
