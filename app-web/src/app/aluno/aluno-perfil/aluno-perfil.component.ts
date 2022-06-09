import { Component, OnInit } from '@angular/core';
import { AlunoService } from 'src/app/aluno-servico/aluno.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ValidarCamposService } from 'src/app/aluno-servico/validar-campos.service';

@Component({
  selector: 'app-aluno-perfil',
  templateUrl: './aluno-perfil.component.html',
  styleUrls: ['./aluno-perfil.component.css']
})
export class AlunoPerfilComponent implements OnInit {
  aluno: any;
  idAluno: number = 0

  constructor(private servicoAluno: AlunoService, private route: ActivatedRoute, private router: Router, private serviceValidar: ValidarCamposService) {
    let routeParams = this.route.snapshot.paramMap;
    this.idAluno = Number(routeParams.get("id"))
    this.servicoAluno.getAluno(this.idAluno).subscribe(x => this.aluno = x)
  }

  ngOnInit(): void {
  }

  editar(dados: any) {
    dados.telefone = this.serviceValidar.validarTelefone(dados.telefone)

    if (this.serviceValidar.validarNome(dados.nome) == "INVALID") {
      alert('Nome Inválido')
    }
    if (this.serviceValidar.validarEmail(dados.email) == "INVALID") {
      alert('Email Inválido')
    }
    console.log(dados.telefone)
    if (dados.telefone == "INVALID") {
      alert('Telefone Inválido')
    }
    if (this.serviceValidar.validarNome(dados.nome) == "VALID" &&
      this.serviceValidar.validarEmail(dados.email) == "VALID" &&
      dados.telefone != "INVALID") {
      this.servicoAluno.alterarAluno(this.idAluno, dados).subscribe(x => this.aluno = x);
      window.location.reload();
      alert('Alterado com sucesso')
    }
  }

  Deslogar() {
    this.router.navigate(['/home']);
  }
}
