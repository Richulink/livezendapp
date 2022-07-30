import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FeedComponent } from './components/feed/feed.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { LoginComponent } from './components/login/login.component';
import { ModalComponent } from './components/modal/modal.component';
import { RegisterComponent } from './components/register/register.component';

const routes: Routes = [
  {
    pathMatch: 'full',
    path: '',
   redirectTo: 'inicio',
  },
  {
    path: 'inicio',
    component:InicioComponent,
    
  }
  ,  {
    path: 'login',
    component:LoginComponent
  },
  {
    path: 'register',
    component:RegisterComponent
  },
  { path: 'feed',component:FeedComponent},
  { path: 'feed/:id',component:FeedComponent},



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
