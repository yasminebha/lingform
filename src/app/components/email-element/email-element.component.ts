import { Component, OnInit, forwardRef } from '@angular/core';
import { ShortAnswerComponent } from '../short-answer/short-answer.component';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'lg-email-element',
  templateUrl: './email-element.component.html',
  styleUrls: [
    './email-element.component.css',
    '../short-answer/short-answer.component.css',
  ],
  providers: [
    {
      multi: true,
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => EmailElementComponent),
    },
  ],
})
export class EmailElementComponent
  extends ShortAnswerComponent
  implements OnInit
{
  override ngOnInit(): void {}
}
