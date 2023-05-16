import { Component, OnInit, forwardRef } from '@angular/core';
import { MultipleChoiceElementComponent } from '../multiple-choice-element/multiple-choice-element.component';
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
      multi: true,
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => OneChoiceComponent),
    },
  ],
})
export class OneChoiceComponent
  extends MultipleChoiceElementComponent
  implements OnInit
{
  override ngOnInit(): void {
    this.addChoice();
    this.addChoice();
  }
}
