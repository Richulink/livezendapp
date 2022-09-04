import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { finalize, Observable } from 'rxjs';
import { AuthServiceService } from 'src/app/services/auth-service';
import { NotaService } from 'src/app/services/nota.service';

@Component({
  selector: 'app-modal-img',
  templateUrl: './modal-img.component.html',
  styleUrls: ['./modal-img.component.css']
})
export class ModalImgComponent implements OnInit {

  imageSrc: string = '';
 
  submitted = false;
  id: string | null;
  crearNota: FormGroup;

  //nota: Observable<any[]>;
  notas: any[] = [];
  //uploadPercent: Observable<number>;
  downloadURL: Observable<string>;
  selectedFile: FileList | null;
  forma: FormGroup;
  tests: Observable<any[]>;


  constructor(
    private notaService: NotaService,
    private fb: FormBuilder,
    private aRoute: ActivatedRoute,
    private auth: AuthServiceService,
    private storage: AngularFireStorage,
    private firestore : AngularFirestore
  ) {

    this.forma = fb.group ({
      nombre_nota: ['', Validators.required],

    })
  
  }
  idUsuario :string
  photo: string;
  nombreUsuario : string
  uploadProgress: Observable<number>;

ngOnInit(): void {  
  this.id = this.aRoute.snapshot.params['id'];
  this.auth.getUserLogger().subscribe(user => {
    this.idUsuario = user.uid;
    this.photo = user.photoURL;
     this.nombreUsuario = user.displayName;

//   console.log(this.idUsuario);
})
 }


  detectFiles(event) {
    this.selectedFile = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      this.imageSrc = reader.result as string;
    };
    reader.readAsDataURL(event.target.files[0]);
  }
  


  uploadFile() {
    const nueva_imagen = this.firestore.collection('notas').ref.doc(this.id);
    console.log(nueva_imagen.id)


    
    const file = this.selectedFile
    const filePath = nueva_imagen.id ; 
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);
    
    //this.uploadPercent = task.percentageChanges();  
    
    task.snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().toPromise().then( (url) => {
          this.downloadURL = url;
          
          nueva_imagen.set({
            nombre_nota: this.forma.value.nombre_nota,
            img : this.downloadURL,
            fechade_creacion: new Date(),
            idUser : this.idUsuario,
            nombreUsuario : this.nombreUsuario,
            fotoUsuario: this.photo,
            myId : nueva_imagen.id
          })

          console.log( this.downloadURL ) 
        }).catch(err=> { console.log(err) });
      })    
    )
    .subscribe()
  }

}

 