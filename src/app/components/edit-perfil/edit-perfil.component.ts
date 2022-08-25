import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-perfil',
  templateUrl: './edit-perfil.component.html',
  styleUrls: ['./edit-perfil.component.css']
})
export class EditPerfilComponent implements OnInit {

  constructor() { }
  
  profileForm = new FormGroup({

    name : new FormControl('', Validators.required),
    photoURL : new FormControl('', Validators.required),
  });



  ngOnInit(): void {
  }

}
