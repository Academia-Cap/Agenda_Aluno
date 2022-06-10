import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
