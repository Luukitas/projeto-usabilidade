import { Component, OnInit, SimpleChanges } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor() { }

  usuario = {};
  verificador = 0

  ngOnInit(): void {
    this.usuario = environment.login;
    this.verificador = Object.keys(this.usuario).length;
  }

  ngOnChanges = (changes: SimpleChanges) => {
    this.usuario = environment.login;
    this.verificador = Object.keys(this.usuario).length;
  }

}
