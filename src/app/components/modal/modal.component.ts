import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthServiceService } from 'src/app/services/auth-service';
import { NotaService } from 'src/app/services/nota.service';


@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  crear_nota: FormGroup;

  userLogged = this.authService.getUserLogger();
  submitted = false;

  public cats = [];
  constructor(private fb: FormBuilder,
    private authService: AuthServiceService,
     private notaService: NotaService,
    ) {


    this.crear_nota = this.fb.group({

      nombre_nota: ['', Validators.required],
      descripcion: ['', Validators.required]
      //id_usuario: this.authService.

    })

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
      console.log('nota regsitrada con exito')
      alert('SUCCESS!! :-)');

    }).catch(error => {
      console.log(error);
    })

  }
 
}







