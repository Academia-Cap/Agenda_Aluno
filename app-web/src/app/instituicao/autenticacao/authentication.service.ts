import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient) { }

  logar(usuario: string, senha: string){
    return this.http.post('http://localhost:8000/alunoLogin/login',{
      usuario: usuario,
      senha: senha
    })
  }
}
