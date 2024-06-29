import { AppState } from '@/app/store/reducers';
import { UserService } from '@/shared/services/user.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder,NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';

import emailjs, { EmailJSResponseStatus } from 'emailjs-com';

@Component({
  selector: 'lg-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  constructor(private fb: FormBuilder,private userService:UserService,private readonly store: Store<AppState>,) { }

  @Input() showModal: boolean = false;
  @Output() modalClose: EventEmitter<void> = new EventEmitter<void>();
  dynamicLink:string= ""
  activeSVG:string= ""
  content: string = 'email'
  formID:string=""
  formTitle:string=""
 
 
  currentUserEmail?:string=""

  
  async ngOnInit(): Promise<void> {
    await this.userService.getUser().then((user) => {
      if (user) this.currentUserEmail = user.email;
    });
console.log(this.currentUserEmail);
this.store
.select((state) => state.builder).subscribe(({form_id,title})=>{
  if(form_id)
  this.formID=form_id
this.formTitle=title
})
}

extractUsername(email: string): string {
  return email.substring(0, email.indexOf('@'));
}
    closeModal() {
      this.modalClose.emit();
    }
    setContent(type: string) {
      this.content = type;
  
      if (type === 'link') {
        this.dynamicLink = this.modifyURL(); 
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
  sendEmail(f: NgForm): void {
    if(this.currentUserEmail){
      const templateParams = {
        from: this.currentUserEmail,
        fromName:this.extractUsername(this.currentUserEmail),
        formTitle:this.formTitle,
        formID:this.formID,
        to: f.value['toControl'],
        subject: f.value['subjectControl'],
        message: f.value['messageControl'],

      };

      emailjs.send('service_ufnlbf8', 'template_hs9drmh', templateParams,'DbhpN5BJJ9nV3TmP0')
        .then((result: EmailJSResponseStatus) => {
          alert('email sent successfuly')
          console.log(result.text);
        }, (error) => {
          console.log(error.text);
        });
    }
   
    
    
  }

}
