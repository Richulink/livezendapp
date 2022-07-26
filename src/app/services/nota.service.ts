import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class NotaService {

  constructor(private firestore: AngularFirestore) { }

  
   public createNota(data: {nombre: string, url: string}) {
    return this.firestore.collection('notas').add(data);
  }
  //Obtiene una nota
  public getNotaPorID(documentId: string) {
    return this.firestore.collection('notas').doc(documentId).snapshotChanges();
  }
  //Obtiene todos las notas
  public getNotas() {
    return this.firestore.collection('notas').snapshotChanges();
  }
  
  //Actualiza la nota
  public updateNota(documentId: string, data: any) {
    return this.firestore.collection('notas').doc(documentId).set(data);
  }


}
