import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/services/auth-service';


@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {


  userLogged = this.authService.getUserLogger();
  
  usuario = {
    email: "",
    password: ""

  }
  constructor(private authService: AuthServiceService ) { }


  ngOnInit(): void {
  }

  ingresarConGoogle(): void {  // el nombre de este metodo es el que se usa en el html para llamarlo
    console.log(this.usuario);


    const { email, password } = this.usuario; // destructuracion de objetos

    this.authService.loginWithGoogle(email, password).then
      (
        res => {
          console.log("usuario logeado", res);
        })
    }

}
