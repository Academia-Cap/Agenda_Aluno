import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidarService {
  private iddisciplina: number = 0;

  constructor() { }

  guardarId(id:number){
    this.iddisciplina = id;
  }

  getId(){
    return this.iddisciplina
  }
}
