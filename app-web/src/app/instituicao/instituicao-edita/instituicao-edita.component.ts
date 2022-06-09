import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InstituicaoService } from 'src/app/instituicao/instituicao-servico/instituicao.service';
import { CepServicoService } from '../instituicao-servico-cep/cep-servico.service';

@Component({
  selector: 'app-instituicao-edita',
  templateUrl: './instituicao-edita.component.html',
  styleUrls: ['./instituicao-edita.component.css']
})
export class InstituicaoEditaComponent implements OnInit {

  constructor(private route: ActivatedRoute, private instituicaoService: InstituicaoService) { 
    this.instituicaoService.getTodos().subscribe(x => this.instituicao = x)
  }
  instituicao: any;
  msg: string = "";
  
  ngOnInit(): void {
    let rota = this.route.snapshot.paramMap;
    let idinst: number = Number(rota.get("id"))
    this.instituicaoService.getId(idinst).subscribe(x => this.instituicao = x)
  }

  efetivarAlteracao(dados:any){
    this.instituicaoService.alterar(this.instituicao).subscribe(x => this.msg = "Registro alterado com sucesso")
  }

  excluir(id: any) {
    this.instituicaoService.excluir(id).subscribe(x => this.msg = "instituicao excluida com sucesso")
  }
}
