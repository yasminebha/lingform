import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'lg-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  constructor() { }
  email: string = '';
  @Input() showModal: boolean = false;
  @Output() modalClose: EventEmitter<void> = new EventEmitter<void>();

  // submitEmail() {
  //   // Effectuez ici les actions appropriées pour traiter l'e-mail
  //   console.log('E-mail ajouté :', this.email);
  //   this.closeModal.emit();
  // }
  

  closeModal() {
    this.modalClose.emit();
  }
  ngOnInit(): void {
  }

}
