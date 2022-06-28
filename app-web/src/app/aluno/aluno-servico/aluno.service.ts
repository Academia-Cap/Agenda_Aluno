import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AlunoService {

  constructor(private http: HttpClient) { }

  gravar(dados: any){
    let url = `http://localhost:8000/aluno`
    return this.http.post(url,dados)
  }

  getAluno(idAluno: number){
    let url = `http://localhost:8000/aluno/${idAluno}`
    return this.http.get(url)
  }

  alterarAluno(id: number, dados: any){
    let url = `http://localhost:8000/aluno/${id}`
    return this.http.put(url, dados)
  }

  deletarAluno(idAluno: number){
    let url = `http://localhost:8000/aluno/${idAluno}`
    return this.http.get(url)
  }

  alterarSenha(dados: any, idAluno: number){
    let url = `http://localhost:8000/aluno/alterarSenha/${idAluno}`
    return this.http.put(url, dados)
  }

  info(){

  }
}
