import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AutenticarService {

  constructor(private http: HttpClient) { }

  logar(usuario: string, senha: string){
    return this.http.post('http://localhost:8080/aluno/login',{
      usuario: usuario,
      senha: senha
    })
  }
}
