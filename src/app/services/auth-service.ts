import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { User } from '@firebase/auth';
import firebase from 'firebase/compat/app';
import { Observable } from 'rxjs';
import { UserInterface } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {


  [x: string]: any;

  private filePath: string;
  public userData$: Observable<firebase.User>;


  constructor(private data: AngularFirestore, private afauth: AngularFireAuth, private router: Router,) {

    this.userData$ = afauth.authState;


  }

  private async updateUserData(user: User) {
    const userRef: AngularFirestoreDocument<User> = this.storage.doc(`dbUsers/${user.uid}`);
    const data = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
    }
  }


  registerWithEmail(email: string, password: string) {
    return this.afauth.createUserWithEmailAndPassword(email, password).then(async () => {
      this.data.collection('dbUsers').add({
        email, password,
        idUser: (await this.afauth.currentUser).uid,
        photoUser: (await this.afauth.currentUser).photoURL,
        nameUser: (await this.afauth.currentUser).displayName
      });

    })
  }

  createUser(user) {
    return this.afs.doc(`users/${user.uid}`).set(user);
  }
  
  async loginWithGoogle(_email: string, _password: string) {
    try {
      return await this.afauth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
        .then(() => this.router.navigate(['/feed'])) // si el login es correcto, redirecciona a la pagina de inicio
        .then(() => this.afauth.authState.subscribe(user => { // si el login es correcto  y el usuario no existe en la base de datos, lo crea
          this.data.collection('dbUsers').doc(user.uid).get().subscribe(doc => {
            if (!doc.exists) {
              this.data.collection('dbUsers').doc(user.uid).set({
                email: user.email,
                idUser: user.uid,
                photoUser: user.photoURL,
                nameUser: user.displayName
              });
            }
          }
          )
        }))
    } catch (error) {
      console.log("error en el login", error);
      return null;
    }
  }




  getIdUserLogger() {

    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.uid = user.uid;
      } else {
        // Empty the value when user signs out
        this.uid = null;
      }
    });
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

  async updateUser() {
    const user = JSON.parse(localStorage.getItem('dbUser')!);
    return (await this.afauth.currentUser).updateProfile({
      displayName: user.name,
      photoURL: user.photoUrl
    }).then(() => {
      this.router.navigate(['/feed']);
    }).catch((error) => {
      window.alert(error);
    });
  }

  private actualizarUser(user) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`dbUsers/${user.uid}`);
    const data: UserInterface = {
      id: user.uid,
      email: user.email,
      name: user.displayName,
      photoUrl: user.photoURL,

    }
    return userRef.set(data, { merge: true })
  }

  
   async loginIn( email: string,password: string) {
    return this.afauth.signInWithEmailAndPassword(email, password)
     .then(() => this.afauth.authState.subscribe(user => { // si el login es correcto  y el usuario no existe en la base de datos, lo crea
      this.data.collection('dbUsers').doc(user.uid).get().subscribe(doc => {
        if (!doc.exists) {
          this.data.collection('dbUsers').doc(user.uid).set({  
            email: user.email,
            idUser: user.uid,
            photoUser: user.photoURL,
            nameUser: user.displayName
          });
        }
        console.log(doc.data(), 'se creo en la base de datos' );
      }
      )
    }))
  }
  async login(email: string, password: string) {
    try {
      return await this.afauth.signInWithEmailAndPassword(email, password);
    } catch (err) {
      console.log("error en el login", err);
      return null;
    }
  }

   getUserById(id:string) {
    return this.data.collection('dbUsers').doc(id).valueChanges();
  }
}


  


/*
 // no sirve pero guarda usuario en localstage

              this.data.collection('users').add({
                email: (await (this.afauth.currentUser)).email,
                idUser: (await this.afauth.currentUser).uid,
                photoUser: (await this.afauth.currentUser).photoURL,
                nameUser: (await this.afauth.currentUser).displayName
              }) //
              console.log('ya se creo el usuario');
            } else {
              console.log('ya existe el usuario');
            }

          })











async UpdateProfile(displayName: string) {
  const profile = {
      displayName: displayName,
      photoURL: "https://example.com/jane-q-user/profile.jpg"
  }
  return (await this.afauth.currentUser).updateProfile(profile);
}



public referenciaCloudStorage(nombreArchivo: string) {
  return this.storage.ref(nombreArchivo);
}






private updateUserData(user) {
  const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
  const data: UserInterface = {
    id: user.uid,
    email: user.email,
    roles: {
      editor: true
    }
  }
  return userRef.set(data, { merge: true })
}




 if (!(await this.afauth.currentUser).emailVerified) {
              (await this.afauth.currentUser).sendEmailVerification();
              this.router.navigate(['/verify-email']);
            }





const user = await this.afauth.currentUser;
        const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
         if (!(await userRef.ref.get())) {

*/ // const user = JSON.parse(localStorage.getItem('user')!);// obtiene el usuario de localstorage
        //if (!this.afs.doc(`users/${user.uid}`).valueChanges().exists) {// si no existe el usuario en la coleccion users

