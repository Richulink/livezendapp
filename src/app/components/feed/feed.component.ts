import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

import { Observable } from 'rxjs';
import { AuthServiceService } from 'src/app/services/auth-service';
import { NotaService } from 'src/app/services/nota.service';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {

  userLogged = this.authService.getUserLogger();
  
  //nota: Observable<any[]>;
  notas: any[] = [];

  
  constructor(private authService: AuthServiceService,
    firestore: AngularFirestore, 
    private notaService : NotaService,
    
    ) { 

//    this.nota = firestore.collection('notas').valueChanges();
    // *ngFor="let notas of nota | async" 
  }
  ngOnInit(): void {
    this.getNotas();
  }

  obtenerUsarioLogeado(){
  this.authService.getUserLogger().subscribe(res=>{

    console.log(res?.email);
  }) 
  }



    getNotas(){
      this.notaService.getNotas().subscribe ( data =>{
      this.notas = [];

     data.forEach((element:any) => {
          //console.log(element.payload.doc.data());
          //console.log(element.payload.doc.id);
          this.notas.push({
            id: element.payload.doc.id, //la variable id recuperar todos los id de cualquier tipo 
            ...element.payload.doc.data()
          })
        });
        console.log(this.notas)
      });
    }
    
    eliminarNota(id: string){
      try {
        this.notaService.eliminarNota(id);
      } catch (error) {
        console.log(error);
      }
    }

  userLogOut() {
    this.authService.logout();
  }
    
  }
 
  
  
  


