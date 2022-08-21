import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { map, Observable } from 'rxjs';
import { NotaInterface } from '../interfaces/nota';

@Injectable({
  providedIn: 'root'
})
export class NotaService {

 
 
  constructor(private firestore: AngularFirestore, private auth: AngularFireAuth) { }
    

    private booksCollection: AngularFirestoreCollection<NotaInterface> ;
    private notas: Observable<NotaInterface[]> | undefined 
    private notaDoc: AngularFirestoreDocument<NotaInterface> | undefined;
     public selectedNota: NotaInterface = { id: null}
   //inicializar las variables
 

  agregarNota (nuevaNota: NotaInterface): Promise <any> {
    return this.firestore.collection('notas').add(nuevaNota); 
  }
  
   //Obtiene todos las notas 
   public getNotas(): Observable <any> {

    return this.firestore.collection('notas' , ref => ref.orderBy ('fechade_creacion','desc')).snapshotChanges();
  }
     

 addNota(nota: NotaInterface): void {
    this.booksCollection.add(nota);
  }
 
  getUserById(idUser: string): Observable<any> {
    return this.firestore.collection('dbUsers').doc(idUser).snapshotChanges();
  }

  getAllNotas() {
    this.booksCollection = this.firestore.collection<NotaInterface>('notas');
    return this.notas = this.booksCollection.snapshotChanges()
      .pipe(map(changes => {
        return changes.map(action => {
          const data = action.payload.doc.data() as NotaInterface;
          data.id = action.payload.doc.id;
          return data;
        });
      }));
  }

  public getNota(id: string): Observable<any> {
    return this.firestore.collection('notas').doc(id).snapshotChanges();
  }

  
  
  ////
 

  eliminarNota(id:string): Promise<any>{
    console.log('nota eliminada con exito');  
    return this.firestore.collection('notas').doc(id).delete() ;
  }

   actualizarNota(data:any): Promise<any> {
    return  this.firestore.collection('notas').doc(data.id).update(data).then (() => {
  
    console.log('nota actualizada con exito');
    });
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
