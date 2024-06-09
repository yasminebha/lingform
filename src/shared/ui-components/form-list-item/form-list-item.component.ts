import { AppState } from '@/app/store/reducers';
import { FormService } from '@/shared/services/form.service';
import { DatePipe } from '@angular/common';
import { Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

@Component({
  selector: 'lg-form-list-item',
  templateUrl: './form-list-item.component.html',
  styleUrls: ['./form-list-item.component.css'],
  providers: [DatePipe]
})
export class FormListItemComponent implements OnInit {

  constructor( private store: Store<AppState>,
    private router: Router, private formService: FormService,private datePipe: DatePipe) { }
    @Input()
    formTitle:string='Untitled Form'
    @Input()
    formID:string=''
    @Input()
    createdAt:string=''
    @ViewChild('svgIcon', { static: false }) svgIcon!: ElementRef;
    @ViewChild('menu', { static: false }) menu!: ElementRef;
    showMenu: boolean = false;
    menuStyle: { [key: string]: string } = {};


    @Input() showCheckbox: boolean=false;
    @Input() isChecked: boolean=false;
    @Output() selectionChange = new EventEmitter<{ formID: string, isChecked: boolean }>();
  
    
  ngOnInit(): void {
    
    this.createdAt = this.datePipe.transform(this.createdAt, 'MMM d, y, h:mm:ss a') || '';
  }
 onFormSelectionChange(event: Event) {
    const checkbox = event.target as HTMLInputElement;
    this.selectionChange.emit({ formID: this.formID, isChecked: checkbox.checked });
  }

  toggleMenu(): void {
    this.showMenu = !this.showMenu;
    if (this.showMenu) {
      this.setPosition();
    }
  }

  setPosition(): void {
    const rect = this.svgIcon.nativeElement.getBoundingClientRect();
    this.menuStyle = {
      top: `${rect.top + window.scrollY}px`,
      left: `${rect.left + window.scrollX - 150}px`,
      position: 'absolute'
    };
  }
  @HostListener('document:click', ['$event'])
  onClick(event: Event): void {
    if(this.svgIcon){
      const clickedInside = this.svgIcon.nativeElement.contains(event.target) ;
      if (!clickedInside) {
        this.showMenu = false;
      }
    }
 
    
  }

  async deleteForm(formId: string): Promise<void> {
    if (confirm('Are you sure you want to delete this form?')) {
      try {
        await this.formService.deleteForm(formId);
        console.log('Form deleted successfully');
        this.showMenu = false; 
        window.location.reload();
      } catch (error) {
        console.error('Error deleting form:', error);
      }
    } else {
      console.log('Form deletion cancelled');
    }
  }
  displayForm(formid:string){
    const url = this.router.createUrlTree(['builder', formid]).toString();
    window.open(url, '_blank');
  }

}
