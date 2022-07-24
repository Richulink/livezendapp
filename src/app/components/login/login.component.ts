import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from 'src/app/services/auth-service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  usuario = {
    email: "",
    password: ""
  }
  constructor(private authService: AuthServiceService) { }
 

  ingresar(): void {  // el nombre de este metodo es el que se usa en el html para llamarlo
    console.log(this.usuario);

    const { email, password } = this.usuario; // destructuracion de objetos

    this.authService.login(email, password).then(res => {
          console.log("se inicio", res);// si el usuario esta logueado, muestra su email
        })

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

  getUser() {
    this.authService.getUserLogger().subscribe(user => {
       console.log(user?.email)  // si el usuario esta logueado, muestra su email
          })
        }
  userLogOut() {
    this.authService.logout();
  }

  ngOnInit(): void {

  }
}
