import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotaService {

  constructor(private firestore: AngularFirestore) { }


  agregarNota (nuevaNota: any): Promise <any> {
    return this.firestore.collection('notas').add(nuevaNota);
  }
   //Obtiene todos las notas
   public getNotas(): Observable <any> {
    return this.firestore.collection('notas' , ref => ref.orderBy ('fechade_creacion','desc')).snapshotChanges();
  }

  eliminarNota(id:string): Promise<any>{
    console.log('nota eliminada con exito');  
    return this.firestore.collection('notas').doc(id).delete() ;
  }



   /*public createNota(data: {nombre: string, url: string}) {
    return this.firestore.collection('notas').add(data);
  }
  
  //Obtiene una nota
  public getNotaPorID(documentId: string) {
    return this.firestore.collection('notas').doc(documentId).snapshotChanges();
  }
 
  
  //Actualiza la nota
  public updateNota(documentId: string, data: any) {
    return this.firestore.collection('notas').doc(documentId).set(data);
  }
*/

}
