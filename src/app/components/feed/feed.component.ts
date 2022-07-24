import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from 'src/app/services/auth-service';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {

  userLogged = this.authService.getUserLogger();
  constructor(private authService: AuthServiceService) { }

  
  userLogOut() {
    this.authService.logout();
  }
  ngOnInit(): void {
  }

}
