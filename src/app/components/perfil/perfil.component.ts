import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthServiceService } from 'src/app/services/auth-service';
import { NotaService } from 'src/app/services/nota.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css'],
  
})
export class PerfilComponent implements OnInit {

     editForm = new FormGroup({
    nombre: new FormControl('', Validators.required),
    photoURL: new FormControl('', Validators.required)
  });
 

  constructor(private auth: AuthServiceService,
    private notaService: NotaService){}

  ngOnInit() {
    
  }
  userLogged = this.auth.getUserLogger();
 
  getUser(idUser: string) { // este metodo se usa para obtener el usuario por su id
     return this.notaService.getUserById(idUser);
    }
  }

 
 
 
   
   
   function vermas(id){
    if(id=="mas"){
    document.getElementById("desplegar").style.display="block";   
    document.getElementById("mas").style.display="none"; 
    }
    else{
    document.getElementById("desplegar").style.display="none";
    document.getElementById("mas").style.display="inline";
    }
    }


  /*
  updateProfile ( ){
    this.auth.updateProfile(this.editForm.value);
 
  }
<<<<<<< HEAD
=======
  
  getUser(idUser: string) { // este metodo se usa para obtener el usuario por su id
     return this.notaService.getUserById(idUser);
    }
  }
>>>>>>> us

}
*/
 