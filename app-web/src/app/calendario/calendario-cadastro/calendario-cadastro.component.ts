import { Component, OnInit } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { DecodeTokenService } from 'src/app/aluno/autenticacao/decode-token.service';
import { CadastroService } from 'src/app/disciplina/disciplina-services/cadastro.service';
import { CalendarioService } from '../calendario-servico/calendario.service';

@Component({
  selector: 'app-calendario-cadastro',
  templateUrl: './calendario-cadastro.component.html',
  styleUrls: ['./calendario-cadastro.component.css']
})
export class CalendarioCadastroComponent implements OnInit {
  model: NgbDateStruct | undefined;

  msg: string = "";
  tarefa: any = { 'id': null,'titulo': '', 'periodo': null, 'horainicio': null, 'horafinal': null, 'descricao': '', 'iddisc': null, 'idaluno': null };
  todosDiasSemana: any;
  tarefaSegunda: any;
  tarefaTerca: any;
  tarefaQuarta: any;
  tarefaQuinta: any;
  tarefaSexta: any;
  tarefaSabado: any;
  tarefaDomingo: any;
  alunoToken: any;
  disciplina: any;
  disc: any = { 'id': null, 'nome': '' };

  constructor(private calendarioService: CalendarioService,
    private decodeToken: DecodeTokenService, private disciplinaService: CadastroService) {
  }

  ngOnInit(): void {
    this.gerarDIas(new Date());
    this.selectDisciplina();
  }

  gravar(dados: any) {
    this.alunoToken = this.decodeToken.decodeTokenJWT()
    dados.idaluno = this.alunoToken.id
    dados.iddisc = Number(dados.iddisc)
    dados.periodo = dados.periodo.year + '/' + dados.periodo.month + '/' + dados.periodo.day
 
    if(this.tarefa.id == null){
      this.calendarioService.gravar(dados).subscribe(x => this.tarefa = x)
    }else{
      dados.id = this.tarefa.id
      this.calendarioService.alterar(dados).subscribe(x => this.tarefa = x)
    }
  }

  gerarDIas(date: Date) {
    this.calendarioService.getDias(date).subscribe(x => {
      this.todosDiasSemana = x
      this.gerarTarefasDoDia(this.todosDiasSemana)
    })
  }

  selectDisciplina() {
    this.disciplinaService.getTodos().subscribe(x => this.disciplina = x)
  }

  gerarTarefasDoDia(listaDias: any) {
    if (listaDias != undefined) {
      for (let i = 0; i < 7; i++) {
        let dia: String = listaDias[i]
        const data = { "periodo":  listaDias[i]}
        switch (i) {
          case 0:
            this.calendarioService.getTarefa(data).subscribe(x => this.tarefaDomingo = x)
            break;
          case 1:
            this.calendarioService.getTarefa(data).subscribe(x => this.tarefaSegunda = x)
            break;
            case 2:
              this.calendarioService.getTarefa(data).subscribe(x => this.tarefaTerca = x)
            break;
            case 3:
              this.calendarioService.getTarefa(data).subscribe(x => this.tarefaQuarta = x)
            break;
            case 4:
              this.calendarioService.getTarefa(data).subscribe(x => this.tarefaQuinta = x)
            break;
            case 5:
              this.calendarioService.getTarefa(data).subscribe(x => this.tarefaSexta = x)
            break;
            case 6:
              this.calendarioService.getTarefa(data).subscribe(x => this.tarefaSabado = x)
            break;
        }
      }
    }
  }

  excluir(id: any) {
    this.calendarioService.excluir(id).subscribe(x => this.msg = "Tarefa excluida com sucesso")
  }
  
  editar(dados: any){
    this.calendarioService.getId(dados).subscribe(x => {
      this.tarefa = x
      let aux: Date = new Date(this.tarefa.periodo)
      this.tarefa.periodo = {year: aux.getFullYear(), month: aux.getMonth(), day: aux.getDate()} 
    })
    
  }

}
