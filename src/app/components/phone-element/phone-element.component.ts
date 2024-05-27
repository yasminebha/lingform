import { Component, OnInit, forwardRef } from '@angular/core';
import { ShortAnswerComponent } from '../short-answer/short-answer.component';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'lg-phone-element',
  templateUrl: './phone-element.component.html',
  styleUrls: ['./phone-element.component.css',
  '../short-answer/short-answer.component.css',],
  providers: [
    {
      multi: true,
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PhoneElementComponent),
    },
  ],
})
export class PhoneElementComponent
  extends ShortAnswerComponent
  implements OnInit
{
  override ngOnInit(): void {}
}
