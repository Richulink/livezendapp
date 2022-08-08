import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
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
   
  ) {

    this.crear_nota = this.fb.group({

      nombre_nota: ['', Validators.required],
      descripcion: ['', Validators.required],
     // fechade_creacion: ['', Validators.required]
    })
    this.id = this.aRoute.snapshot.paramMap.get('id');
    //console.log(this.id);
   }

  ngOnInit(): void {
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
}
