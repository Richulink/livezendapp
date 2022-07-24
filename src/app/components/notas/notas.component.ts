import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-notas',
  templateUrl: './notas.component.html',
  styleUrls: ['./notas.component.css']
})
export class NotasComponent implements OnInit {

  nota: Observable<any[]>;
  constructor(firestore: AngularFirestore) {
    this.nota = firestore.collection('notas').valueChanges();
    
   }
  
  ngOnInit(): void {
  }

}
