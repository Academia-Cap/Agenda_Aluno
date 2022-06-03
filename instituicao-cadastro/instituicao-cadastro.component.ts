import { Component, OnInit } from '@angular/core';
import { Form, FormsModule } from '@angular/forms';
import { InstituicaoService } from 'src/app/instituicao/instituicao-servico/instituicao.service';
import { CepServicoService } from '../instituicao-servico-cep/cep-servico.service';


@Component({
  selector: 'instituicao-cadastro',
  templateUrl: './instituicao-cadastro.component.html',
  styleUrls: ['./instituicao-cadastro.component.css']
})
export class InstituicaoCadastroComponent implements OnInit {

  msg: string = ""
  instituicao: any;

  constructor(private instituicaoService: InstituicaoService, private cepService: CepServicoService) {
    this.instituicaoService.getTodos().subscribe(x => this.instituicao = x)
  }

  gravar(dados: any) {
    this.instituicaoService.gravar(dados).subscribe(x => this.msg = "instituicao criado com sucesso")

  }

  excluir(id: any) {
    this.instituicaoService.excluir(id).subscribe(x => this.msg = "instituicao excluida com sucesso")
  }

  ngOnInit(): void {

  }

  cep:string="";
  endereco: any = {};

  consultarCep(event: any) {
    this.cep=event.target.value;
    this.cepService.buscar(this.cep).subscribe((dados)=> this.endereco = dados);
  }

}
