import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NotaService } from './nota.service';

@Component({
  selector: 'app-notas',
  templateUrl: './notas.component.html',
  styleUrls: ['./notas.component.css']
})

export class NotasComponent implements OnInit {

  nota: any;
  disciplina: any;
  iddisc: any;
  notaMedia: number = 0;

  constructor(private route: ActivatedRoute, private notaService: NotaService) {
    let rota = this.route.snapshot.paramMap;
    this.iddisc = Number(rota.get("id"))
    this.notaService.getTodos(this.iddisc).subscribe(x => this.nota = x)
    this.notaService.getTodos(this.iddisc).subscribe(x => this.gerarMedia(x))
  }

  ngOnInit(): void {
    
  }

  salvarNota(nota: any) {
    nota.iddisc = this.iddisc
    this.notaService.salvarNota(nota).subscribe(() => location.reload())
  }

  excluirNota(id: any) {
    this.notaService.excluirNota(id).subscribe(() => location.reload())
  }

  gerarMedia(dados: any) {
    var media: number = 0
    for(let calcMedia of dados){
      media = Number(calcMedia.nota) + media
    }
    this.notaMedia = media/dados.length
  }

}
