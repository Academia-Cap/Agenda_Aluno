import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InstituicaoCadastroComponent } from './instituicao/instituicao-cadastro/instituicao-cadastro.component';
import { InstituicaoEditaComponent } from './instituicao/instituicao-edita/instituicao-edita.component';
import { LoginComponent } from './instituicao/login/login.component';
import { AuthLoginService } from './instituicao/autenticacao/auth-login.service';



const routes: Routes = [
  {
    path:'instituicao/:id',
    component: InstituicaoEditaComponent
  },
  {
    path:'cadastrainstituicao',
    component: InstituicaoCadastroComponent,
    canActivate: [AuthLoginService]
  },
  {
    path:'',
    component: InstituicaoCadastroComponent
  },
  {
    path: 'login',
    component: LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
