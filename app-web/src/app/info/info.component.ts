import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnInit {
  displayStyle = "none";
  constructor() { }

  ngOnInit(): void {
  }

  closeInfo() {
    this.displayStyle = "none";
  }
}
