import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-modal-config',
  templateUrl: './modal-config.component.html',
  styleUrls: ['./modal-config.component.css']
})
export class ModalConfigComponent implements OnInit {

  @Input() name;

  constructor(public activeModal: NgbActiveModal) { }

  
  ngOnInit(): void {
  }

}
