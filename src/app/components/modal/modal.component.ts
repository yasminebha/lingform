import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  constructor() { }
  email: string = '';

  @Output() closeModal = new EventEmitter<void>();

  submitEmail() {
    // Effectuez ici les actions appropriées pour traiter l'e-mail
    console.log('E-mail ajouté :', this.email);
    this.closeModal.emit();
  }
  ngOnInit(): void {
  }

}
