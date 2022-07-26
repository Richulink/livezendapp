import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from 'src/app/services/auth-service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  
  
  userLogged = this.authService.getUserLogger();

  constructor(private authService: AuthServiceService) { }


  
  
  userLogOut() {
    this.authService.logout();
  }
  ngOnInit(): void {
  }
}
