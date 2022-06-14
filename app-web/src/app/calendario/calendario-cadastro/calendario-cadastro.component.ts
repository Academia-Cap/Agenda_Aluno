import { Component, OnInit } from '@angular/core';
import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-calendario-cadastro',
  templateUrl: './calendario-cadastro.component.html',
  styleUrls: ['./calendario-cadastro.component.css']
})
export class CalendarioCadastroComponent implements OnInit {
  model: NgbDateStruct | undefined;

  tarefa: any;
  todosDiasSemana : any;
  tarefaSegunda: any;
  tarefaTerca: any;
  tarefaQuarta: any;
  tarefaQuinta: any;
  tarefaSexta: any;
  tarefaSabado: any;
  tarefaDomingo: any;

  constructor() {}

  ngOnInit(): void {
    this.gerar7Dias(new Date());
  }

  gravar(){}

  gerar7Dias(data: Date){
    let todosDiasSemana;
    console.log(todosDiasSemana)
  }

}
