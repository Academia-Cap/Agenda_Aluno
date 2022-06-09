import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlunoCadastrarComponent } from './aluno/aluno-cadastrar/aluno-cadastrar.component';
import { AlunoPerfilComponent } from './aluno/aluno-perfil/aluno-perfil.component';

const routes: Routes = [
  { path: '', component: AlunoCadastrarComponent },
  { path: 'home', component: AlunoCadastrarComponent },
  { path: 'perfilAluno/:id', component: AlunoPerfilComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
