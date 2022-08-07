import { identifierName } from '@angular/compiler';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbModal, NgbModalOptions} from '@ng-bootstrap/ng-bootstrap';

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

  userLogged = this.authService.getUserLogger() ;
  
  //notasId = this.aRoute.snapshot.params['id'];
  
  
  
  submitted = false;
  id: string | null;
  crear_nota: FormGroup;

  //nota: Observable<any[]>;
  notas: any[] = [];


  @ViewChild("myModalInfo", {static: false}) myModalInfo: TemplateRef<any>;
  @ViewChild("myModalConf", {static: false}) myModalConf: TemplateRef<any>;

  
  constructor(private authService: AuthServiceService,
    firestore: AngularFirestore,
    private notaService: NotaService,
    private fb: FormBuilder,
    private aRoute: ActivatedRoute,
    private modalService: NgbModal
  ) {
    
    this.crear_nota = this.fb.group({

      nombre_nota: ['', Validators.required],
      descripcion: ['', Validators.required],
     // fechade_creacion: ['', Validators.required]
    })
    this.id = this.aRoute.snapshot.paramMap.get('id');
    //console.log(this.id);
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
  mostrarModalInfo(){
   this. modalService.open(this.myModalInfo).result.then( r => {
      console.log(r);
    }).catch(error => {
      console.log(error);
    })
  }
 
  mostrarModalConf(){
    this.modalService.open(this.myModalConf).result.then( r => {
      console.log("Tu respuesta ha sido: " + r);
    }, error => {
      console.log(error);
    });
  }
  


  ngOnInit(): void {
    this.getNotas();
   
  }

   //del usuadio
   userLogOut() {
    this.authService.logout();
  }
  obtenerUsarioLogeado() {
    this.authService.getUserLogger().subscribe(res => {
      console.log(res?.email);
    })
  }


  agregarNota() {
    this.submitted = true;
    if (this.crear_nota.invalid) {
      return;
    }
    const nuevaNota: any = {
      nombre_nota: this.crear_nota.value.nombre_nota,
      descripcion: this.crear_nota.value.descripcion,
      fechade_creacion: new Date()
      //agregar el uid y la foto de perfil
    }
    this.notaService.agregarNota(nuevaNota).then(() => {
      console.log('nota regsitrada con exito');
      //alert('SUCCESS!! :-)');
    }).catch(error => {
      console.log(error);
    })
  }



 

  getNotas() {
    this.notaService.getNotas().subscribe(data => {
      this.notas = [];

      data.forEach((element: any) => {
        //console.log(element.payload.doc.data());
        //console.log(element.payload.doc.id);
        this.notas.push({
          id: element.payload.doc.id, //la variable id recuperar todos los id de cualquier tipo 
          ...element.payload.doc.data()
          
        })
      });
      console.log(this.notas)
    });
  }

  editarNota(){
    if(this.id !== null){  
      this.notaService.getNota(this.id).subscribe(nota =>{
        console.log(nota.payload.data()['nombre_nota']);
      })
    }
    }

  eliminarNota(id: string) {
    try {
      this.notaService.eliminarNota(id);
    } catch (error) {
      console.log(error);
    }
  }
  getNotasById(id: string) {
    this.notaService.getNota(id);
  }


  //[routerLink]= "['/feed/',notas.id]"

  preUpdate(nota: NotaInterface) {
    
    this.notaService.selectedNota = Object.assign({}, nota)//y pasar los datos a una variable global 
  
    console.log(this.notaService.selectedNota)
      
    //this.notaService.editarNota.id = nota.id;
    
    //new var contenedor de la nota
   
      
    




      ;
  }





 
}






