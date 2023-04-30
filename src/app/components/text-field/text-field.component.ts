
import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'lg-text-field',
  templateUrl: './text-field.component.html',
  styleUrls: ['./text-field.component.css']
})
export class TextFieldComponent implements OnInit {

  constructor() { }
  @Input()
  type : 'text'|'email'|'password' |'search' ='text';
  ngOnInit(): void {
  }

}
