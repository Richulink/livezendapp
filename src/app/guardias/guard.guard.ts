import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GuardGuard implements CanActivate {
  constructor(private auth: AngularFireAuth, private root: Router){

  }
  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean | UrlTree> {
    const user = await this.auth.currentUser;
    const isAuthenticated = user ? true : false;
      if(!isAuthenticated){
        this.root.navigate (['/inicio']);
        alert('primero debe acceder');
        
      }
      return isAuthenticated;
    }
  
}
