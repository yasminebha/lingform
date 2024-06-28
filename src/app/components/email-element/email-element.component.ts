import { Component, OnInit, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, NG_VALIDATORS, AbstractControl, ValidationErrors } from '@angular/forms';
import { ShortAnswerComponent } from '../short-answer/short-answer.component';

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
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => EmailElementComponent),
      multi: true,
    },
  ],
})
export class EmailElementComponent
  extends ShortAnswerComponent
  implements OnInit {

  override ngOnInit(): void {}

  validate(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    const emailRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    if (value && !emailRegex.test(value)) {
      return { invalidEmail: true };
    }
    return null;
  }
}
