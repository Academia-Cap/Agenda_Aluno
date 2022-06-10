import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../autenticacao/authentication.service';
import { DecodeTokenService } from '../autenticacao/decode-token.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(
    private auth: AuthenticationService,
    private decodeToken: DecodeTokenService
    ) { }
  

  logar(form: any){
    this.auth.logar(form.email, form.senha).subscribe(
      token => {
        localStorage.setItem('token', JSON.stringify(token))
      } 
    )
    console.log(form.email, form.senha)
  }

  verToken(){
    let usuario = this.decodeToken.decodeTokenJWT()
    console.log(usuario) 
  }

}
