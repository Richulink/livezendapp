import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from 'src/app/services/auth-service';


@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  usuario = {
    email: "",
    password: ""
  }
  constructor(private authService: AuthServiceService) { }


  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  ingresarConGoogle(): void {  // el nombre de este metodo es el que se usa en el html para llamarlo
    console.log(this.usuario);


    const { email, password } = this.usuario; // destructuracion de objetos

    this.authService.loginWithGoogle(email, password).then
      (
        res => {
          console.log("se registro", res);
        })
    }

}
