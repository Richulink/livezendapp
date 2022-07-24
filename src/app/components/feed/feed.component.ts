import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { AuthServiceService } from 'src/app/services/auth-service';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {

  userLogged = this.authService.getUserLogger();
  
  nota: Observable<any[]>;

  
  constructor(private authService: AuthServiceService,firestore: AngularFirestore) { 
    this.nota = firestore.collection('notas').valueChanges();
  }

  
  userLogOut() {
    this.authService.logout();
  }
  ngOnInit(): void {
  }

}
