import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InformacaoService {
  private displayInfo: any;

  constructor() { }

  getDisplayInfo() {
    return this.displayInfo;
  }

  setDisplayInfo(display: any) {
    this.displayInfo = display;
  }
}
