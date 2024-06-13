import { Component, OnInit, forwardRef } from '@angular/core';
import { MultipleChoiceElementComponent, MultipleChoiceOption } from '../multiple-choice-element/multiple-choice-element.component';

import { NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'lg-one-choice',
  templateUrl: './one-choice.component.html',
  styleUrls: [
    './one-choice.component.css',
    '../multiple-choice-element/multiple-choice-element.component.css',
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => OneChoiceComponent),
      multi: true,
    },
  ],
})
export class OneChoiceComponent
  extends MultipleChoiceElementComponent
  implements OnInit
{
  override onValueChange(key: string): void {
    this.answers = [key]
    this.changeCommit(this.answers);
  }
  

 

}
