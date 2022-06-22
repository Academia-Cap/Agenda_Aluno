import { Component, OnInit } from '@angular/core';
import { AlunoService } from '../aluno-servico/aluno.service';
import { DecodeTokenService } from '../aluno-servico/autenticacao/decode-token.service';

@Component({
  selector: 'app-aluno-alterarsenha',
  templateUrl: './aluno-alterarsenha.component.html',
  styleUrls: ['./aluno-alterarsenha.component.css']
})
export class AlunoAlterarsenhaComponent implements OnInit {
  alunoToken: any;

  constructor(private servicoAluno: AlunoService, private decodeToken: DecodeTokenService) {
    this.alunoToken = this.decodeToken.decodeTokenJWT()
  }

  ngOnInit(): void {
  }

  alterarSenha(dados: any) {
    console.log(dados)
    this.servicoAluno.alterarSenha(dados, this.alunoToken.id).subscribe(() => {
      alert("Senha alterada com sucesso!")
    })
  }

}
