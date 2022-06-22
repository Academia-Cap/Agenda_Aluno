import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class InstituicaoService {

  constructor(private http: HttpClient) { }

  gravar(dados: any){
    return this.http.post('http://localhost:8000/instituicao', dados)
  }

  getTodos(dados: any){
   return this.http.post('http://localhost:8000/instituicao/get',dados)
  }

  excluir(id: number){
    return this.http.delete(`http://localhost:8000/instituicao/${id}`)
  }

  getId(id: number){
    return this.http.get(`http://localhost:8000/instituicao/${id}`)
  }

  alterar(dados:any){
    return this.http.put(`http://localhost:8000/instituicao/${dados.id}`, dados)
  }
  
}
