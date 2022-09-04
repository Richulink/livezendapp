import { Component, Input, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { map } from 'rxjs';
import { AuthServiceService } from 'src/app/services/auth-service';
import { NotaService } from 'src/app/services/nota.service';

@Component({
  selector: 'app-crear-nota-modal',
  templateUrl: './crear-nota-modal.component.html',
  styleUrls: ['./crear-nota-modal.component.css']
})
export class CrearNotaModalComponent implements OnInit {

 

  submitted = false;
  id: string | null;
  crear_nota: FormGroup;

  //nota: Observable<any[]>;
  notas: any[] = [];

  constructor(
    private notaService: NotaService,
    private fb: FormBuilder,
    private aRoute: ActivatedRoute,
    private auth: AuthServiceService
   
  ) {

    this.crear_nota = this.fb.group({
      nombre_nota: ['', Validators.required],
      descripcion: ['', Validators.required],
    })
    this.id = this.aRoute.snapshot.paramMap.get('id'); // obtengo el id de la nota que se quiere editar
    //console.log(this.id);
   }


   idUsuario :string
   photo: string;
   nombreUsuario : string

   ngOnInit(): void {  
    this.auth.getUserLogger().subscribe(user => {
      this.idUsuario = user.uid;
      this.photo = user.photoURL;
       this.nombreUsuario = user.displayName;

 //   console.log(this.idUsuario);
  })
   }

    getUid() {
    console.log(this.idUsuario);
}
  agregarNota() {
    this.submitted = true;
    if (this.crear_nota.invalid) {
        return;
        
    }
    const nuevaNota: any = {
      nombre_nota: this.crear_nota.value.nombre_nota,
      descripcion: this.crear_nota.value.descripcion,
      fechade_creacion: new Date(),
      idUser : this.idUsuario,
      fotoUsuario: this.photo,
      nombreUsuario: this.nombreUsuario
    }
  
    this.notaService.agregarNota(nuevaNota).then(() => {
      console.log('nota regsitrada con exito');
      //alert('SUCCESS!! :-)');
    }).catch(error => {
      console.log(error);
    })
  }
}



 /*
    this.auth.getUserLogger().subscribe(user => {  
      console.log(user?.uid)  // si el usuario esta logueado, muestra su email
       console.log(user?.email)   
       console.log(user?.displayName) 
       console.log(user?.photoURL)
       console.log(user?.emailVerified) *

       this.crear_nota.patchValue({
        uid:user?.uid,
        email: user?.email,
        displayName: user?.displayName,
        })
        this.crear_nota.value.displayName = user?.displayName;
        this.crear_nota.value.email = user?.email;
        this.crear_nota.value.photoURLs = user?.photoURL;
        
      })    
         */