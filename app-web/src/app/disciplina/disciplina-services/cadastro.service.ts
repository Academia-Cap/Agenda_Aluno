
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CadastroService {

  constructor(private http: HttpClient) { }

  gravar(dados: any) {
    let url = `https://agendaaluno.herokuapp.com/disciplina`
    return this.http.post(url, dados)
  }

  getTodos(dados: any) {
    return this.http.post(`https://agendaaluno.herokuapp.com/disciplina/get`,dados)
  }

  excluir(id: number) {
    return this.http.delete(`https://agendaaluno.herokuapp.com/disciplina/${id}`)
  }

  getId(id: number) {
    return this.http.get(`https://agendaaluno.herokuapp.com/disciplina/${id}`)
  }

  alterar(dados: any) {
    return this.http.put(`https://agendaaluno.herokuapp.com/disciplina/${dados.id}`, dados)
  }

}