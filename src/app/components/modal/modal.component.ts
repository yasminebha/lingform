import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'lg-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  constructor(private router: Router) { }
  email: string = '';
  @Input() showModal: boolean = false;
  @Output() modalClose: EventEmitter<void> = new EventEmitter<void>();
  dynamicLink:string= ""
  activeSVG:string= ""
  content: string = 'email'
  // submitEmail() {
  //   // Effectuez ici les actions appropriées pour traiter l'e-mail
  //   console.log('E-mail ajouté :', this.email);
  //   this.closeModal.emit();
  // }
  
  ngOnInit(): void {
  }
  
    closeModal() {
      this.modalClose.emit();
    }
    setContent(type: string) {
      this.content = type;
  
      if (type === 'link') {
        this.dynamicLink = this.modifyURL(); // Set the dynamic link when 'link' content is selected
      }
    }
  
    modifyURL(): string {
      const currentURL = window.location.href;
      const newURL = currentURL.replace('/builder/', '/forms/') + '/viewform';
      return newURL;
    }
    
  copyLink() {
    navigator.clipboard.writeText(this.dynamicLink).then(() => {
      alert('Link copied to clipboard');
    }).catch(err => {
      console.error('Failed to copy the text to clipboard', err);
    });
  }
  isActiveSVG(buttonType: string): boolean {
    return this.activeSVG === buttonType;
  } 
}
