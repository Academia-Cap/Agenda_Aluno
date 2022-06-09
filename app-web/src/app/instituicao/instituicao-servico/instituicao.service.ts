import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class InstituicaoService {

  constructor(private http: HttpClient) { }

  gravar(dados: any){
    return this.http.post('http://localhost:8000/instituicao', dados)
    //return this.http.post('http://localhost:8080/instituicao', dados)
  }

  getTodos(){
   return this.http.get('http://localhost:8000/instituicao')
   //return this.http.get('http://localhost:8080/instituicao')
  }

  excluir(id: number){
    return this.http.delete(`http://localhost:8000/instituicao/${id}`)
    //return this.http.delete(`http://localhost:8080/instituicao/${id}`)
  }

  getId(id: number){
    return this.http.get(`http://localhost:8000/instituicao/${id}`)
    //return this.http.get(`http://localhost:8080/instituicao/${id}`)
  }

  alterar(dados:any){
    return this.http.put(`http://localhost:8000/instituicao/${dados.id}`, dados)
    //return this.http.put(`http://localhost:8080/instituicao/${dados.id}`, dados)
  }
  
}
