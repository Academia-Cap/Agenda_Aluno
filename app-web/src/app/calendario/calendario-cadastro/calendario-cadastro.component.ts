import { Component, OnInit } from '@angular/core';
import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import { CalendarioService } from '../calendario-servico/calendario.service';

@Component({
  selector: 'app-calendario-cadastro',
  templateUrl: './calendario-cadastro.component.html',
  styleUrls: ['./calendario-cadastro.component.css']
})
export class CalendarioCadastroComponent implements OnInit {
  model: NgbDateStruct | undefined;

  constructor(private calendarioService: CalendarioService) {}

  msg: string ="";
  tarefa: any = {'titulo' : '', 'periodo': '', 'horainicial':'','horafinal':'', 'descricao':'','disciplina':''};

  ngOnInit(): void {
  }

  gravar(dados: any) {
    this.calendarioService.gravar(dados).subscribe(x => console.log("certo aqui"+ x))

  }

}
