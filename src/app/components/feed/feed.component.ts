import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Nota } from 'src/app/interfaces/nota';
import { AuthServiceService } from 'src/app/services/auth-service';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {

  userLogged = this.authService.getUserLogger();
  
 // nota: Observable<any[]>;

  
  constructor(private authService: AuthServiceService,firestore: AngularFirestore) { 


    //this.nota = firestore.collection('notas').valueChanges();
    // *ngFor="let notas of nota | async" -en html

    const shirtsCollection = firestore.collection<Nota>('notas');
    shirtsCollection.add({ descripcion: 'item', nota: 'sola' });
    
  }
  


  
  userLogOut() {
    this.authService.logout();
  }
  ngOnInit(): void {
  }

}
