import { Component, OnInit } from '@angular/core';
import { ShortAnswerComponent } from '../short-answer/short-answer.component';

@Component({
  selector: 'lg-phone-element',
  templateUrl: './phone-element.component.html',
  styleUrls: ['./phone-element.component.css',
  '../short-answer/short-answer.component.css',],
})
export class PhoneElementComponent
  extends ShortAnswerComponent
  implements OnInit
{
  override ngOnInit(): void {}
}
