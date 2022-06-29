import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class InstituicaoService {

  constructor(private http: HttpClient) { }

  gravar(dados: any){
    return this.http.post('https://agendaaluno.herokuapp.com/instituicao', dados)
  }

  getTodos(dados: any){
   return this.http.post('https://agendaaluno.herokuapp.com/instituicao/get',dados)
  }

  excluir(id: number){
    return this.http.delete(`https://agendaaluno.herokuapp.com/instituicao/${id}`)
  }

  getId(id: number){
    return this.http.get(`https://agendaaluno.herokuapp.com/instituicao/${id}`)
  }

  alterar(dados:any){
    return this.http.put(`https://agendaaluno.herokuapp.com/instituicao/${dados.id}`, dados)
  }
  
}
