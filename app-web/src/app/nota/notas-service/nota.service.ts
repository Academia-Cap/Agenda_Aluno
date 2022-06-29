import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotaService {
  route: any;

  constructor(private http: HttpClient) { }

  salvarNota(nota: any){
    let url = `https://agendaaluno.herokuapp.com/nota`
    return this.http.post(url, nota)
  }

  excluirNota(id: any){
    return this.http.delete(`https://agendaaluno.herokuapp.com/nota/${id}`)
  }

  getTodos(iddisc: any) {
    return this.http.get(`https://agendaaluno.herokuapp.com/nota/${iddisc}`)
  }

}