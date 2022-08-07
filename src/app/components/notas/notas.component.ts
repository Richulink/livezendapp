import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

import { NotaService } from 'src/app/services/nota.service';
@Component({
  selector: 'app-notas',
  templateUrl: './notas.component.html',
  styleUrls: ['./notas.component.css']
})
export class NotasComponent implements OnInit {


  notaCrud : NotaService [] = [];

  nota: Observable<any[]>;
  constructor(firestore: AngularFirestore, private notaService: NotaService) {
    this.nota = firestore.collection('notas').valueChanges();
    
   }

   
   
  ngOnInit(){
  
  }

}
