import { Component, ElementRef, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal, NgbModalOptions} from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

import { NotaService } from 'src/app/services/nota.service';
import { ModalConfigComponent } from '../modal-config/modal-config.component';



@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

   
  submitted = false;
  id: string | null;
  crear_nota: FormGroup;

  //nota: Observable<any[]>;
  notas: any[] = [];


  ngOnInit(): void {
    
  }

  constructor(public notaService: NotaService,
    firestore: AngularFirestore,
    private fb: FormBuilder,
    private aRoute: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private modalService: NgbModal
   
    ) {
    this.crear_nota = this.fb.group({
      nombre_nota: ['', Validators.required],
      descripcion: ['', Validators.required],
    })
  }

  @Input() userUid: string = null;
  @ViewChild('btnClose') btnClose: ElementRef 

  @ViewChild("eliminarNota", { static: false })eliminarNota: TemplateRef<any>;
  @ViewChild("myModalConf", { static: false }) myModalConf: TemplateRef<any>;
  
  
   actualizarNota() {

    this.submitted = true;
   
   
if ( 
  this.crear_nota.get('nombre_nota').value == '' &&
  this.crear_nota.get('descripcion').value == '' 
) 
{
  this.modalService.open(this.eliminarNota).result.then(r => {
    console.log(r);
  }).catch(error => {
    console.log(error);
  })

 // this.id = this.notaService.selectedNota.id;
  //this.notaService.eliminarNota(this.id);
}else{
  const editNota: any ={
    id: this.notaService.selectedNota.id,
    nombre_nota: this.notaService.selectedNota.nombre_nota,
    descripcion: this.notaService.selectedNota.descripcion,   
  }
   this.notaService.actualizarNota(editNota).then(() => {
    this.toastr.info('Su nota fue modificada', '', {
      positionClass: 'toast-bottom-right'})
})
}
   }
  
    aceptar(){
     this.id = this.notaService.selectedNota.id;
     this.notaService.eliminarNota(this.id);

     this.toastr.info('Su nota fue eliminada', '', {
      positionClass: 'toast-bottom-right'})
    }

   open() {
    const modalRef = this.modalService.open(ModalConfigComponent);
    modalRef.componentInstance.my_modal_title = ' ';
    modalRef.componentInstance.my_modal_content = '  ';
  }
  logoutScreenOptions: NgbModalOptions = {
    backdrop: 'static',
    keyboard: false
  };
  mostrarModalInfo() {
    this.modalService.open(this.eliminarNota).result.then(r => {
      console.log(r);
    }).catch(error => {
      console.log(error);
    })
  }

  mostrarModalConf() {
    this.modalService.open(this.myModalConf).result.then(r => {
      console.log("Tu respuesta ha sido: " + r);
    }, error => {
      console.log(error);
    });
  }
}

/*
if(this.crear_nota.invalid ){
      return;
   }else(editNota.nombre_nota != null && editNota.descripcion != null){
    this.notaService.eliminarNota(this.notaService.selectedNota.id);
   } 
   
   // crear funcion para cerrar el modal
   this.notaService.actualizarNota(editNota).then(() => {
    this.toastr.info('Su nota fue modificada', '', {
      positionClass: 'toast-bottom-right'
    })
*/



 
 



/*

   notaForm.resetForm();
    this.btnClose.nativeElement.click();
  }





  onSaveBook(bookForm: NgForm): void {
    if (bookForm.value.id == null) {
      // New 
      bookForm.value.userUid = this.userUid;
      this.dataApi.addBook(bookForm.value);
    } else {
      // Update
      this.dataApi.updateBook(bookForm.value);
    }
    bookForm.resetForm();
    this.btnClose.nativeElement.click();
  }
*/


 //  [(ngModel)]="this.notaService.selectedNota.nombreNota"

 //this.resetForm(notaForm);
