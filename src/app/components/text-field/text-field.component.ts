
import { Component, OnInit,Input,ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'lg-text-field',
  templateUrl: './text-field.component.html',
  styleUrls: ['./text-field.component.css']
})
export class TextFieldComponent implements OnInit {
  @ViewChild('input') inputElement!: ElementRef;

  constructor() { }
  @Input()
  type : string='text';
  @Input()
  placeholder? : string ='';
  @Input()
  layout: string ='text-field';
  @Input()
  isDisabled: boolean = false;
  ngOnInit(): void {
    
  }

}
