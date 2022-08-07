import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { User } from '@firebase/auth';
import firebase from 'firebase/compat/app';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  [x: string]: any;

  constructor(private afauth: AngularFireAuth,
    private router: Router,
   ) {

  }

  async register(email: string, password: string) {
   
    try {
      return await this.afauth.createUserWithEmailAndPassword(email, password);
    } catch (error) {
      console.log("error en el login", error);
      return null;
    }
  }

  async login (email: string, password: string) {

    try {
      return await this.afauth.signInWithEmailAndPassword(email, password);
    } catch (err) {
      console.log("error en el login", err);
      return null;
    }
  }

  async loginWithGoogle(email: string, password: string) {

    try {
      return await this.afauth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then (() => this.router.navigate(['/feed']));
    } catch (error) {
      console.log("error en el login", error);
      return null;
    }
  }

  getUserLogger() {
    return this.afauth.authState; // devuelve el estado de la sesion
 }

 
  logout() {
   this.afauth.signOut(); // cierra sesion
 }
 
 get isLoggedIn(): boolean {
   const user = JSON.parse(localStorage.getItem('user')!);
   return user !== 'null' ? true : false;
 }

 
 ForgotPassword(passwordResetEmail: string) {
  return this.afauth
    .sendPasswordResetEmail(passwordResetEmail)
    .then(() => {
      window.alert('Password reset email sent, check your inbox.');
    })
    .catch((error) => {
      window.alert(error);
    });
}


/*
async UpdateProfile(displayName: string) {
  const profile = {
      displayName: displayName,
      photoURL: "https://example.com/jane-q-user/profile.jpg"
  }
  return (await this.afauth.currentUser).updateProfile(profile);
}
*/
}
