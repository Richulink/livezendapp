import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AngularFireModule } from '@angular/fire/compat';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from 'src/environments/environment';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { NotasComponent } from './components/notas/notas.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { FeedComponent } from './components/feed/feed.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ModalComponent } from './components/modal/modal.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxPaginationModule } from 'ngx-pagination';
import { EditNotaComponent } from './components/edit-nota/edit-nota.component';
import { NgbActiveModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ModalConfigComponent } from './components/modal-config/modal-config.component';
import { ToastInjector, ToastrModule } from 'ngx-toastr';



@NgModule({
  declarations: [
    NotasComponent,
    AppComponent,
    LoginComponent,
    RegisterComponent,
    FeedComponent,
    NavbarComponent,
    ModalComponent,
    EditNotaComponent,
    ModalConfigComponent,
  
  ],
  entryComponents:[
    

  ],

  imports: [
   
    FormsModule,
    NgxPaginationModule,
    BrowserModule,
    AppRoutingModule,
    
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    NgbModule,
    ToastrModule.forRoot()
 
  ],
  providers: [NgbActiveModal],
  bootstrap: [AppComponent]
 

})
export class AppModule { }
