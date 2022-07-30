import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { NotaService } from 'src/app/services/nota.service';

@Component({
  selector: 'app-edit-nota',
  templateUrl: './edit-nota.component.html',
  styleUrls: ['./edit-nota.component.css']
})
export class EditNotaComponent implements OnInit {


  

  constructor(private notaService : NotaService) { }

  ngOnInit(): void {
    
  }




}

