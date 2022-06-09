import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule} from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InstituicaoCadastroComponent } from './instituicao/instituicao-cadastro/instituicao-cadastro.component';
import { InstituicaoEditaComponent } from './instituicao/instituicao-edita/instituicao-edita.component';

import { NgxMaskModule, IConfig } from 'ngx-mask';
import { LoginComponent } from './instituicao/login/login.component'

@NgModule({
  declarations: [
    AppComponent,
    InstituicaoCadastroComponent,
    InstituicaoEditaComponent,
    LoginComponent,
  ],
  imports: [
      BrowserModule,
      AppRoutingModule,
      FormsModule,
      HttpClientModule,
      NgxMaskModule.forRoot()
      
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
