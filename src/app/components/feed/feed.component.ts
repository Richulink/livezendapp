import { identifierName } from '@angular/compiler';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';


import { Observable } from 'rxjs';
import { NotaInterface } from 'src/app/interfaces/nota';
import { AuthServiceService } from 'src/app/services/auth-service';
import { NotaService } from 'src/app/services/nota.service';
import { ModalConfigComponent } from '../modal-config/modal-config.component';


@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {

  userLogged = this.authService.getUserLogger();

  uidUser = this.authService.getUserLogger.name;
 
  //notasId = this.aRoute.snapshot.params['id'];

  
  submitted = false;
  id: string | null;
  crear_nota: FormGroup;

  //nota: Observable<any[]>;
  notas: any[] = [];


  @ViewChild("eliminarNota", { static: false })  Nota: TemplateRef<any>;
  @ViewChild("editarRol", { static: false })  Rol: TemplateRef<any>;
 

 
  idUsuario: string;
  


  constructor(private authService: AuthServiceService,
    private storage: AngularFireStorage,
    private notaService: NotaService,
    private modalService: NgbModal,
    private toastr: ToastrService) {
  }
  
guardar(){  
   
   
}

  async ngOnInit(): Promise<void> {

    this.getNotas();

    this.authService.getUserLogger().subscribe(
      user => {
      this.idUsuario = user.uid;
    });
/*
 await new Promise(resolve => setTimeout(resolve, 15000));
  this.editarRol();
       */
  }   
  



 // metodo para saber si el atributo rol es nulo
  //y que tarde 15 segundos en aparecer

  // que este metodo se inicie solo
  editarRol() {     
                    
    if( this.crear_nota.value.rol == null) {   {
      this.modalService.open(this.Rol, { size: 'lg' });
      console.log( this.crear_nota.value.rol);
             
    } 
    
    }
    }
/*
getUserById( iduser: string) {
    this.authService.traerUsuarioSegunId(iduser);
   console.log( this.authService.user.uid);
    this. authService.getUserById(iduser).subscribe(res => {
      console.log(res.email);
    })
*/
     async getuid() {
    await this.authService.user.uid;
   }
  

  getUserByName(name: string) {
    this.authService.getUserByName(name);
  }



  open() {
    const modalRef = this.modalService.open(ModalConfigComponent);
    modalRef.componentInstance.my_modal_title = 'I your title';
    modalRef.componentInstance.my_modal_content = 'I am your content';
  }
  logoutScreenOptions: NgbModalOptions = {
    backdrop: 'static',
    keyboard: false
  };

  eliminarNotaModal() {
    this.modalService.open(this.Nota, { size: 'lg' }); // este metodo abre el modal con el template que le pasamos por parametro.
  }

  
  
   aceptar(){
    this.id = this.notaService.selectedNota.id;
    this.notaService.eliminarNota(this.id);

    this.toastr.success('Su nota fue eliminada', '', {
     positionClass: 'toast-bottom-right'})
   }

   
idRes: string;

  //del usuadio 
  
     
  userLogOut() {  
    this.authService.logout();
  }
  obtenerUsarioLogeado() {
    this.authService.getUserLogger().subscribe(res => {
      console.log(res?.email);
    })
  }


  getNotas() {
    this.notaService.getNotas().subscribe(data => {
      this.notas = [];

      data.forEach((element: any) => {
        //console.log(element.payload.doc.data());
        //console.log(element.payload.doc.id);
        this.notas.push({ // push es un metodo de array que agrega un elemento al array
          id: element.payload.doc.id, // este es el id de la nota
          ...element.payload.doc.data() // ... es un operador de propagacion de datos, es decir, toma todos los datos de la nota y los pasa a una variable
      
        })
      });
      
       console.log(this.id);
      console.log(this.notas)
    });
  }
  eliminarNota(id: string) {
    try {
      this.notaService.eliminarNota(id)
      //this.notaService.eliminarImagen (this.idUsuario,id);
     
    } catch (error) {
      console.log(error);
    }
  }
  getNotasById(id: string) {
    this.notaService.getNota(id);
  }

  preUpdate(nota: NotaInterface) { //[routerLink]= "['/feed/',notas.id]"
    this.notaService.selectedNota = Object.assign({}, nota)//y pasar los datos a una variable global LLAMADA selectedNota
    console.log(this.notaService.selectedNota)
  }
   preCreate(){
    this.authService.user.uid;
    console.log(this.authService.user.uid);
    }
  }


/*
  verMas(nota: NotaInterface) {
    this.notaService.selectedNota = Object.assign({}, nota)//y pasar los datos a una variable global LLAMADA selectedNota
    console.log(this.notaService.selectedNota)
    this.modalService.open(this.modalVerMas, { size: 'lg' });
  }
*/

/*
         // traer de de la collecion de dbUsers el usuario que tenga el mismo id que el id de la nota
         this.authService.getUserById(element.payload.doc.data().idUser).subscribe (res => {   //traer el usuario que tenga el mismo id que el id de la nota
          this.idRes = this.iduser; //  el id del usuario que creo la nota
         
        
          
          console.log(this.idRes);
        })
*/

/*
if(confirm('Estas seguro de eliminar esta nota?')){
  const id = this.notaService.selectedNota.id;
  console.log(id);
 this.toastr.success('Nota eliminada con exito'); //verde
 console.log(id);
 }
 this.toastr.info('no fue', '', {
  positionClass: 'toast-bottom-right'}) // azul
}
*/


    
   /*
    this.authService.getUserLogger().subscribe(user => {
      this.per = user.displayName;
    console.log(user?.uid);
  })

  }


  getUid() {
    console.log(this.per);
}
*/
  //per :string
