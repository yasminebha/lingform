import { Component, OnInit } from '@angular/core';
import { MultipleChoiceElementComponent } from '../multiple-choice-element/multiple-choice-element.component';

@Component({
  selector: 'lg-one-choice',
  templateUrl: './one-choice.component.html',
  styleUrls: [
    './one-choice.component.css',
    '../multiple-choice-element/multiple-choice-element.component.css',
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
