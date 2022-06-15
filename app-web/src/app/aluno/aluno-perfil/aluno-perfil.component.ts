import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlunoService } from '../aluno-servico/aluno.service';
import { ValidarCamposService } from '../aluno-servico/validar-campos.service';
import { DecodeTokenService } from '../autenticacao/decode-token.service';


@Component({
  selector: 'app-aluno-perfil',
  templateUrl: './aluno-perfil.component.html',
  styleUrls: ['./aluno-perfil.component.css']
})
export class AlunoPerfilComponent implements OnInit {
  //aluno = {'id': null, 'nome': '', 'telefone': '', 'email': '', 'usuario': '', 'senha': ''};
  aluno: any;
  idAluno: number = 0
  alunoToken: any;

  constructor(private servicoAluno: AlunoService, private route: ActivatedRoute, private router: Router, 
    private serviceValidar: ValidarCamposService, private decodeToken: DecodeTokenService) {
    this.alunoToken = this.decodeToken.decodeTokenJWT()
    this.idAluno = this.alunoToken.id
    this.servicoAluno.getAluno(this.idAluno).subscribe(x => this.aluno = x)
  }

  ngOnInit(): void {
  }

  editar(dados: any) {
    dados.telefone = this.serviceValidar.validarTelefone(dados.telefone)

    if (this.serviceValidar.validarNome(dados.nome) == "INVALID") {
      alert('Nome Inválido')
    }
    if (this.serviceValidar.validarNome(dados.usuario) == "INVALID") {
      alert('Usuário Inválido')
    }
    if (dados.telefone == "INVALID") {
      alert('Telefone Inválido')
    }
    if (this.serviceValidar.validarNome(dados.nome) == "VALID" && dados.telefone != "INVALID" 
      && this.serviceValidar.validarNome(dados.usuario)) {
      this.servicoAluno.alterarAluno(this.idAluno, dados).subscribe(x => this.aluno = x);
      window.location.reload();
      alert('Alterado com sucesso')
    }
  }

  Deslogar() {
    localStorage.removeItem('token')
    this.router.navigate(['/']);
  }
}
