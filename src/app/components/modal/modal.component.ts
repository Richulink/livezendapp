import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

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
    private aRoute: ActivatedRoute) {

      
    this.crear_nota = this.fb.group({

      nombre_nota: ['', Validators.required],
      descripcion: ['', Validators.required],
     // fechade_creacion: ['', Validators.required]
    })
    this.id = this.aRoute.snapshot.paramMap.get('id');
    console.log(this.id);
  }
     


  @Input() userUid: string = null;
  @ViewChild('btnClose') btnClose: ElementRef 

  
  
  
  agregarNota() {
    this.submitted = true;
    const editNota: any ={
      id: this.notaService.selectedNota.id,
      nombre_nota: this.notaService.selectedNota.nombre_nota,
      descripcion: this.notaService.selectedNota.descripcion,   
    }

   this.notaService.actualizarNota(editNota);
    
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
