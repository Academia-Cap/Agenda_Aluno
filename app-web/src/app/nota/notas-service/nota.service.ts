import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotaService {
  route: any;

  constructor(private http: HttpClient) { }

  salvarNota(nota: any){
    let url = `http://localhost:8000/nota`
    return this.http.post(url, nota)
  }

  excluirNota(id: any){
    return this.http.delete(`http://localhost:8000/nota/${id}`)
  }

  getTodos(iddisc: any) {
    return this.http.get(`http://localhost:8000/nota/${iddisc}`)
  }

}