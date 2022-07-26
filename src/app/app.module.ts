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
import { NgbActiveModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ModalConfigComponent } from './components/modal-config/modal-config.component';
import { ToastrModule } from 'ngx-toastr';
import { CrearNotaModalComponent } from './components/crear-nota-modal/crear-nota-modal.component';
import { NumbersOnlyDirective } from './directives/numbers-only.directive';
import { PerfilComponent } from './components/perfil/perfil.component';
import { EditPerfilComponent } from './components/edit-perfil/edit-perfil.component';
import { ModalImgComponent } from './components/modal-img/modal-img.component';
import { NgxImageCompressService } from 'ngx-image-compress';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { InicioComponent } from './components/inicio/inicio.component';


@NgModule({
  declarations: [
    NotasComponent,
    AppComponent,
    LoginComponent,
    RegisterComponent,
    FeedComponent,
    NavbarComponent,
    ModalComponent,
    ModalConfigComponent,
    CrearNotaModalComponent,
    NumbersOnlyDirective,
    PerfilComponent,
    EditPerfilComponent,
    ModalImgComponent,
    InicioComponent

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
    AngularFireStorageModule,
    NgbModule,
    // importar angular storage para angular cli 1
    ToastrModule.forRoot(),

  ],
  providers: [
    NgbActiveModal,
    NgxImageCompressService
  ],
  bootstrap: [AppComponent]
 

})
export class AppModule { }
