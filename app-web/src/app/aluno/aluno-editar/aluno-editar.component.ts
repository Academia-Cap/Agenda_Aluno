import { Component, OnInit } from '@angular/core';
import { AlunoService } from 'src/app/aluno-servico/aluno.service';

@Component({
  selector: 'app-aluno-editar',
  templateUrl: './aluno-editar.component.html',
  styleUrls: ['./aluno-editar.component.css']
})
export class AlunoEditarComponent implements OnInit {

  constructor(private servicoServico: AlunoService) { }

  editar(dados: any){
    
  }
  
  ngOnInit(): void {
  }

}
