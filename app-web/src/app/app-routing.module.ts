import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DisciplinaCadastroComponent } from './disciplina/disciplina-cadastro/disciplina-cadastro.component';
import { DisciplinaEditaComponent } from './disciplina/disciplina-edita/disciplina-edita.component';


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
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
