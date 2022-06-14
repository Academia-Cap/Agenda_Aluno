import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CalendarioServiceService {

  constructor(private http: HttpClient) { }

  getDias(data: any){
    let url = `http://localhost:8000/calendario/gerarDias`
    return this.http.get(url, data)
  }
}
