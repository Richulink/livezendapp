import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { NotaService } from 'src/app/services/nota.service';



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
    private toastr: ToastrService
   
    ) {
    this.crear_nota = this.fb.group({
      nombre_nota: ['', Validators.required],
      descripcion: ['', Validators.required],
    })
  }

  @Input() userUid: string = null;
  @ViewChild('btnClose') btnClose: ElementRef 

  
  
  
   actualizarNota() {
    this.submitted = true;
    const editNota: any ={
      id: this.notaService.selectedNota.id,
      nombre_nota: this.notaService.selectedNota.nombre_nota,
      descripcion: this.notaService.selectedNota.descripcion,   
    }

   this.notaService.actualizarNota(editNota).then(() => {
    this.toastr.info('Su nota fue modificada', '', {
      positionClass: 'toast-bottom-right'
    })
   // crear funcion para cerrar el modal
  
})
   }
}




 
 



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
