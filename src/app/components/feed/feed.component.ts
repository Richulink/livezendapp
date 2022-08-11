import { identifierName } from '@angular/compiler';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';

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

  //notasId = this.aRoute.snapshot.params['id'];



  submitted = false;
  id: string | null;
  crear_nota: FormGroup;

  //nota: Observable<any[]>;
  notas: any[] = [];


  @ViewChild("eliminarNota", { static: false })borrarNota: TemplateRef<any>;
  @ViewChild("myModalConfXX", { static: false }) myModalConf: TemplateRef<any>;


  constructor(private authService: AuthServiceService,
    private notaService: NotaService,
    private modalService: NgbModal

  ) {

    
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

  borrarNotas() {
    this.modalService.open(this.borrarNota).result.then(r => {
     
    })
  }
  aceptar(){
    this.notaService.eliminarNota(this.notaService.selectedNota.id);
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

  preUpdate(nota: NotaInterface) { //[routerLink]= "['/feed/',notas.id]"
    this.notaService.selectedNota = Object.assign({}, nota)//y pasar los datos a una variable global LLAMADA selectedNota
    console.log(this.notaService.selectedNota)
  }
}






