import { Component, OnInit } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { CalendarioServiceService } from '../calendario-servico/calendario-service.service';
import { CalendarioService } from '../calendario-servico/calendario.service';

@Component({
  selector: 'app-calendario-cadastro',
  templateUrl: './calendario-cadastro.component.html',
  styleUrls: ['./calendario-cadastro.component.css']
})
export class CalendarioCadastroComponent implements OnInit {
  model: NgbDateStruct | undefined;

  constructor(private calendarioService: CalendarioService, private servicoCalendario: CalendarioServiceService) { }

  msg: string = "";
  tarefa: any = { 'titulo': '', 'periodo': '', 'horainicial': '', 'horafinal': '', 'descricao': '', 'disciplina': '' };
  todosDiasSemana: any;
  tarefaSegunda: any;
  tarefaTerca: any;
  tarefaQuarta: any;
  tarefaQuinta: any;
  tarefaSexta: any;
  tarefaSabado: any;
  tarefaDomingo: any;

  ngOnInit(): void {
    this.gerarDIas(new Date());
    console.log(this.todosDiasSemana);
  }

  gravar(dados: any) {
    this.calendarioService.gravar(dados).subscribe(x => console.log("certo aqui" + x))
  }

  gerarDIas(date: Date) {
    this.servicoCalendario.getDias(date).subscribe(x => console.log(x))
  }
}
