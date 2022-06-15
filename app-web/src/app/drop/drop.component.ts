import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DecodeTokenService } from '../aluno/autenticacao/decode-token.service';

@Component({
  selector: 'app-drop',
  templateUrl: './drop.component.html',
  styleUrls: ['./drop.component.css']
})
export class DropComponent implements OnInit {
  alunoToken: any;
  constructor(private router: Router, private decodeToken: DecodeTokenService) { }

  ngOnInit(): void {
    this.alunoToken = this.decodeToken.decodeTokenJWT()
  }

}
