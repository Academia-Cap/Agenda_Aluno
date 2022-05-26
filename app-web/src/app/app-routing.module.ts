import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InstituicaoCadastroComponent } from './instituicao/instituicao-cadastro/instituicao-cadastro.component';
import { InstituicaoEditaComponent } from './instituicao/instituicao-edita/instituicao-edita.component';


const routes: Routes = [
  {
    path:'instituicao/:id',
    component: InstituicaoEditaComponent
  },
  {
    path:'cadastrainstituicao',
    component: InstituicaoCadastroComponent
  },
  {
    path:'',
    component: InstituicaoCadastroComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
