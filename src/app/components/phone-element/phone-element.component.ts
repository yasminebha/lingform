import { Component, OnInit } from '@angular/core';
import { ShortAnswerComponent } from '../short-answer/short-answer.component';

@Component({
  selector: 'app-phone-element',
  templateUrl: './phone-element.component.html',
  styleUrls: ['./phone-element.component.css']
})
export class PhoneElementComponent extends ShortAnswerComponent implements OnInit {

  constructor() {
    super();
  }

  override ngOnInit(): void {
  }

}
