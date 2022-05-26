import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class InstituicaoService {

  constructor(private http: HttpClient) { }

  gravar(dados: any){
    let url = 'http://localhost:8000/instituicao'
    return this.http.post(url, dados)
  }

  getTodos(){
   return this.http.get('http://localhost:8000/instituicao')
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
