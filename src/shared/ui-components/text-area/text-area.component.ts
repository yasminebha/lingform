import { Component, OnInit } from '@angular/core';
import { TextFieldComponent } from '../text-field/text-field.component';

@Component({
  selector: 'lg-text-area',
  templateUrl: './text-area.component.html',
  styleUrls: ['./text-area.component.css']
})
export class TextAreaComponent extends TextFieldComponent implements OnInit {


  override ngOnInit(): void {
  }

}
