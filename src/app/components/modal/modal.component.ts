import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NotaService } from 'src/app/services/nota.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  crearNota: FormGroup;


  submitted = false; 

  public cats = [];
  constructor( private firestoreService: NotaService, private fb: FormBuilder) {


    this.crearNota= this.fb.group({

      nonbreNota: ['', Validators.required],
      descripcion: ['', Validators.required]
    })

   }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }


  agregarNota() {
    
    this.submitted= true;
if(this.crearNota.invalid){
  return;
}

    console.log(this.crearNota); 
  }


  }





  

