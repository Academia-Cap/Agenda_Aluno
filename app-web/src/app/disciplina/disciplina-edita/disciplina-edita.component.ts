import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CadastroService } from '../disciplina-cadastro/disciplina-services/cadastro.service';

@Component({
  selector: 'app-disciplina-edita',
  templateUrl: './disciplina-edita.component.html',
  styleUrls: ['./disciplina-edita.component.css']
})
export class DisciplinaEditaComponent implements OnInit {
  serviceCadastro: any;

  constructor(private route: ActivatedRoute, private cadastroService: CadastroService, ) {
    this.cadastroService.getTodos().subscribe(x => this.disciplina = x)
  }

  nota: any;
  disciplina: any;
  msg: String = "";

  ngOnInit(): void {
    let rota = this.route.snapshot.paramMap;
    let iddisc: number = Number(rota.get("id"))
    this.cadastroService.getId(iddisc).subscribe(x => this.disciplina = x)
  }

  efetivarAlteracao(_dados:any){
    this.cadastroService.alterar(this.disciplina).subscribe(x_ => window.location.reload())
  }

  excluir(id: any){
    this.cadastroService.excluir(id).subscribe(_x => this.msg = "Disciplina excluida com sucesso")
  }

}
