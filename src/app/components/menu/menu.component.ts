import { Component, OnInit, SimpleChanges } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(private router: Router) { }

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

  sair = () => {
    environment.login = {};
    this.router.navigate(['/login'])
  }

}
