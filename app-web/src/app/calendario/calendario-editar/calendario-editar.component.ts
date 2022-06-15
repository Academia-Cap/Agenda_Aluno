import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CadastroService } from 'src/app/disciplina/disciplina-services/cadastro.service';
import { CalendarioService } from '../calendario-servico/calendario.service';

@Component({
  selector: 'app-calendario-editar',
  templateUrl: './calendario-editar.component.html',
  styleUrls: ['./calendario-editar.component.css']
})
export class CalendarioEditarComponent implements OnInit {

  constructor(private route: ActivatedRoute, private calendarioService: CalendarioService, private disciplinaService: CadastroService) { 
  }

  disciplina: any;
  msg: string = "";
  tarefa: any = { 'titulo': '', 'periodo': null, 'horainicio': null, 'horafinal': null, 'descricao': '', 'iddisc': null, 'idaluno': null };
  todosDiasSemana: any;
  tarefaSegunda: any;
  tarefaTerca: any;
  tarefaQuarta: any;
  tarefaQuinta: any;
  tarefaSexta: any;
  tarefaSabado: any;
  tarefaDomingo: any;
  alunoToken: any;

  
  ngOnInit(): void {
    this.gerarDIas(new Date());
    this.selectDisciplina();
    let rota = this.route.snapshot.paramMap;
    let idTr: number = Number(rota.get("id"))
    this.calendarioService.getId(idTr).subscribe(x => this.tarefa = x)
  }

  efetivarAlteracao(dados:any){
    this.calendarioService.alterar(this.tarefa).subscribe(x => this.msg = "Registro alterado com sucesso")
  }

  excluir(id: any) {
    this.calendarioService.excluir(id).subscribe(x => this.msg = "instituicao excluida com sucesso")
  }

  gerarDIas(date: Date) {
    this.calendarioService.getDias(date).subscribe(x => {
      this.todosDiasSemana = x
      this.gerarTarefasDoDia(this.todosDiasSemana)
    })
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

  selectDisciplina() {
    this.disciplinaService.getTodos().subscribe(x => this.disciplina = x)
  }

  editar(dados: any){
    this.calendarioService.getId(dados).subscribe(x => this.tarefa = x)
  }

}
