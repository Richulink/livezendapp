import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthServiceService } from 'src/app/services/auth-service';
import { NotaService } from 'src/app/services/nota.service';

@Component({
  selector: 'app-modal-img',
  templateUrl: './modal-img.component.html',
  styleUrls: ['./modal-img.component.css']
})
export class ModalImgComponent implements OnInit {


 
  submitted = false;
  id: string | null;
  crear_nota: FormGroup;

  //nota: Observable<any[]>;
  notas: any[] = [];

  constructor(
    private notaService: NotaService,
    private fb: FormBuilder,
    private aRoute: ActivatedRoute,
    private auth: AuthServiceService,
   private storage : AngularFireStorageModule
  ) {

    this.crear_nota = this.fb.group({
      nombre_nota: ['', Validators.required],
      img: ['', Validators.required],
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

    onUpload(e){

    }

  
    

/*
const ref = this.firestore.ref(filePath);
    const task = this.firestore.upload(filePath, file);
    task.snapshotChanges().pipe
*/


   // this.crear_nota.patch value({
   //   img: e.target.files[0]
    //})
  


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
      img: this.crear_nota.value.img,
      fechade_creacion: new Date(),
      idUser : this.idUsuario,
      fotoUsuario: this.photo,
      nombreUsuario: this.nombreUsuario
    }
  
    this.notaService.agregarNota(nuevaNota).then(() => {
      console.log('nota registrada con exito');
      //alert('SUCCESS!! :-)');
    }).catch(error => {
      console.log(error);
    })
  }
}




