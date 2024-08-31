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
    updatedAt:string=''
    @Input() subCount!:number
    @ViewChild('svgIcon', { static: false }) svgIcon!: ElementRef;
    @ViewChild('menu', { static: false }) menu!: ElementRef;

    menuStyle: { [key: string]: string } = {};


    @Input() showCheckbox: boolean=false;
    @Input() isChecked: boolean=false;
    @Output() selectionChange = new EventEmitter<{ formID: string, isChecked: boolean }>();
  
    
  ngOnInit(): void {
    
    this.updatedAt = this.datePipe.transform(this.updatedAt, 'MMM d. y') || '';
  }
 onFormSelectionChange(event: Event) {
    const checkbox = event.target as HTMLInputElement;
    this.selectionChange.emit({ formID: this.formID, isChecked: checkbox.checked });
  }



  setPosition(): void {
    const rect = this.svgIcon.nativeElement.getBoundingClientRect();
    this.menuStyle = {
      top: `${rect.top + window.scrollY}px`,
      left: `${rect.left + window.scrollX - 150}px`,
      position: 'absolute'
    };
  }
 

  async deleteForm(formId: string): Promise<void> {
    if (confirm('Are you sure you want to delete this form?')) {
      try {
      
        await this.formService.deleteForm(formId);
        console.log('Form deleted successfully');
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
