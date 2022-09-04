import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { ToastrService } from 'ngx-toastr';
import { map, Observable } from 'rxjs';
import { NotaInterface } from '../interfaces/nota';

@Injectable({
  providedIn: 'root'
})
export class NotaService {
  _idUsuario: string;
  id: string;

 
 
  constructor(private firestore: AngularFirestore, private auth: AngularFireAuth,
    private storage: AngularFireStorage,
    private toastr: ToastrService) { }
    

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
  actualizarNota(data:any): Promise<any> {
    return  this.firestore.collection('notas').doc(data.id).update(data).then (() => {
  
    console.log('nota actualizada con exito');
    });
  }

  eliminarNota(id:string): Promise<any>{
    console.log('nota eliminada con exito');  
    return this.firestore.collection('notas').doc(id).delete().then (() => {
      this.storage.ref(id).delete();

      this.toastr.success('Su nota fue eliminada', id , { positionClass: 'toast-bottom-right' });
  })
  }
}



