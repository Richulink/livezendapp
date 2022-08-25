import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthServiceService } from 'src/app/services/auth-service';
import { NotaService } from 'src/app/services/nota.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css'],
  template: `
  <div class="modal-header">
    <h4 class="modal-title">Hi there!</h4>
    <button type="button" class="btn-close" aria-label="Close" (click)="activeModal.dismiss('Cross click')"></button>
  </div>
  <div class="modal-body">
    <p>Hello, World!</p>
    <p><button class="btn btn-lg btn-outline-primary" (click)="open()">Launch demo modal</button></p>
  </div>
  <div class="modal-footer">
    <button type="button" class="btn btn-outline-dark" (click)="activeModal.close('Close click')">Close</button>
  </div>
`
})
export class PerfilComponent implements OnInit {

     editForm = new FormGroup({
    nombre: new FormControl('', Validators.required),
    photoURL: new FormControl('', Validators.required)
  });
 

  constructor(private auth: AuthServiceService,
    private notaService: NotaService){}
<<<<<<< HEAD
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
 
  userLogged = this.auth.getUserLogger();
 


  getUser(idUser: string) { // este metodo se usa para obtener el usuario por su id
     return this.notaService.getUserById(idUser);
    }
  }
=======
  ngOnInit() {
    
  }
  userLogged = this.auth.getUserLogger();
 

}
>>>>>>> us

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
 