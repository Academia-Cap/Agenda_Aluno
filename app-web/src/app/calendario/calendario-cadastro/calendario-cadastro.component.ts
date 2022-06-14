import { Component, OnInit } from '@angular/core';
import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import { CalendarioServiceService } from '../calendario-servico/calendario-service.service';

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

  constructor(private servicoCalendario: CalendarioServiceService) {}

  ngOnInit(): void {
    this.gerarDIas(new Date());
    console.log(this.todosDiasSemana);
  }

  gravar(){}

  gerarDIas(date: Date){
    this.servicoCalendario.getDias(date).subscribe(x => console.log(x))
  }
}
