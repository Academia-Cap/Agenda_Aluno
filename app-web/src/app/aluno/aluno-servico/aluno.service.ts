import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AlunoService {

  constructor(private http: HttpClient) { }

  gravar(dados: any){
    let url = `https://agendaaluno.herokuapp.com/aluno`
    return this.http.post(url,dados)
  }

  getAluno(idAluno: number){
    let url = `https://agendaaluno.herokuapp.com/aluno/${idAluno}`
    return this.http.get(url)
  }

  alterarAluno(id: number, dados: any){
    let url = `https://agendaaluno.herokuapp.com/aluno/${id}`
    return this.http.put(url, dados)
  }

  deletarAluno(idAluno: number){
    let url = `https://agendaaluno.herokuapp.com/aluno/${idAluno}`
    return this.http.get(url)
  }

  alterarSenha(dados: any, idAluno: number){
    let url = `https://agendaaluno.herokuapp.com/aluno/alterarSenha/${idAluno}`
    return this.http.put(url, dados)
  }

  info(){

  }
}
