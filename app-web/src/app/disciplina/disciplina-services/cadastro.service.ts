
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CadastroService {

  constructor(private http: HttpClient) { }

  gravar(dados: any) {
    let url = `http://localhost:8000/disciplina`
    return this.http.post(url, dados)
  }

  getTodos(dados: any) {
    return this.http.post(`http://localhost:8000/disciplina/get`,dados)
  }

  excluir(id: number) {
    return this.http.delete(`http://localhost:8000/disciplina/${id}`)
  }

  getId(id: number) {
    return this.http.get(`http://localhost:8000/disciplina/${id}`)
  }

  alterar(dados: any) {
    return this.http.put(`http://localhost:8000/disciplina/${dados.id}`, dados)
  }

}