import { Component, OnInit } from '@angular/core';
import { elementAt, window } from 'rxjs';
import { AlunoService } from '../aluno-servico/aluno.service';
import { DecodeTokenService } from '../aluno-servico/autenticacao/decode-token.service';

@Component({
  selector: 'app-aluno-avatar',
  templateUrl: './aluno-avatar.component.html',
  styleUrls: ['./aluno-avatar.component.css']
})
export class AlunoAvatarComponent implements OnInit {

  avatarImg: string = ''
  avatarLista: Array<string> = [];
  avatar: string[] = ['tj5Depa', '26GzsVw', '8E3XXMt', 'pKhFl4F', '7chCWdf', 'tA9eA1m', 'sKy0jmm', 'SVyCDMp',
    '8YyX2xS', 'bEprRiC', 'GUs2mVf', 'jClpb5T', 'j0LyOrl', '19sRKOt', 'BrYKYf8', 'yB3UszW', 'lxfGvFp', 'LQ1CP6T']
  image: string = '';
  imageHash: any;
  link: any;
  idavatar: any;
  alunoToken: any;
  idAluno: any;
  imagem: any;
  hash: string = '';
  avatarhash: string = '';
  linkImage: string = '';
  vazio: string = '';
  hashImage: any ={'idAvatar':''};

  constructor(private servicoAluno: AlunoService, private decodeToken: DecodeTokenService) {
    this.alunoToken = this.decodeToken.decodeTokenJWT()
    this.idAluno = this.alunoToken.id
  }

  ngOnInit(): void {
    this.mostrarAvatares()
  }


  mostrarAvatares() {
    for (let i = 0; i < this.avatar.length; i++) {
      this.hash = "https://i.imgur.com/" + this.avatar[i] + ".png"
      this.avatarLista.push(this.hash)
    }
  }


  escolherAvatar(id: any) {
    this.linkImage = id
    this.vazio = ""
    this.hashImage.idAvatar = this.linkImage.replace("https://i.imgur.com/", this.vazio)

    this.hashImage.idAvatar = this.hashImage.idAvatar.replace(".png", this.vazio)
    this.servicoAluno.addAvatar(this.hashImage, this.idAluno).subscribe(x => console.log(x))

  }
}
