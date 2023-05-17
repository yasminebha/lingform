import { Component, OnInit } from '@angular/core';
import { MultipleChoiceElementComponent, MultipleChoiceOption } from '../multiple-choice-element/multiple-choice-element.component';
import { updateBlock } from '@/app/store/actions/builder.actions';
import { debounce } from '@/shared/utils/timing';

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
  
  

 

}
