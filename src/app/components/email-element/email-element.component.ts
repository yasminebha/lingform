import { Component, OnInit } from '@angular/core';
import { ShortAnswerComponent } from '../short-answer/short-answer.component';

@Component({
  selector: 'lg-email-element',
  templateUrl: './email-element.component.html',
  styleUrls: ['./email-element.component.css','../short-answer/short-answer.component.css']
})
export class EmailElementComponent extends ShortAnswerComponent implements OnInit {

  constructor() {
    super();
  }

  override ngOnInit(): void {
  }

}
