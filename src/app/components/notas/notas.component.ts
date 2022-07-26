import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { NotaServiceService } from 'src/app/services/nota-service.service';
import { Nota } from 'src/app/interfaces/nota';
@Component({
  selector: 'app-notas',
  templateUrl: './notas.component.html',
  styleUrls: ['./notas.component.css']
})
export class NotasComponent implements OnInit {


  notaCrud : Nota [] = [];

  nota: Observable<any[]>;
  constructor(firestore: AngularFirestore, private notaService: NotaServiceService) {
    this.nota = firestore.collection('notas').valueChanges();
    
   }

   
   
  ngOnInit(){
  
  }

}
