import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import {Nota} from '../interfaces/nota'

@Injectable({
  providedIn: 'root'
})
export class ShareServiceService {

  nota: Observable<any[]>;
  
  constructor(public db: AngularFirestore) {
   
    this.nota = db.collection('notas').valueChanges();  
    
   }
 getNotas(){
  return this.nota;  
 }
   
   
}
