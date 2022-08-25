import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from 'src/app/services/auth-service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

   
  usuario = {
    email: "",
    password: ""
  }
  constructor(private authService: AuthServiceService) { }
 

  loguearse(): void {  // el nombre de este metodo es el que se usa en el html para llamarlo
    console.log(this.usuario);

    const { email, password } = this.usuario; // destructuracion de objetos

    this.authService.register(email, password).then(res => {
          console.log("se inicio", res);// si el usuario esta logueado, muestra su email
        })
  }
  registrarse(): void {  // el nombre de este metodo es el que se usa en el html para llamarlo
    console.log(this.usuario);

    const { email, password } = this.usuario; // destructuracion de objetos

    this.authService.registerWithEmail(email, password).then(res => {
          console.log("se registro", res);// si el usuario esta logueado, muestra su email
        })
  }

  ngOnInit(): void {
  }
  regiterUserWithEmail( email: string, password: string ) {
    this.authService.registerWithEmail( email, password );
  }
}
