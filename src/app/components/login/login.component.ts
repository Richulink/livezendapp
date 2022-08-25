import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  constructor(private authService: AuthServiceService, private route : Router) { }
 

  ingresar(): void {  // el nombre de este metodo es el que se usa en el html para llamarlo
    console.log(this.usuario);

    const { email, password } = this.usuario; // destructuracion de objetos

    this.authService.login(email, password).then(res => {
          console.log("se inicio", res);// si el usuario esta logueado, muestra su email
        })

  }


onSubmit(): void{
  this.loginIn();  
}


  loginIn(): void {
    const { email, password } = this.usuario;
    this.authService.loginIn(email, password)
    .then (() => {
      this.route.navigate(['/feed']);
    })
  
    .then(res => {
      console.log("se inicio", res);// si el usuario esta logueado, muestra su email
    }).catch(err => {
      console.log("error", err);
    }
    )
  }

  
  ngOnInit(): void {

  }
}
