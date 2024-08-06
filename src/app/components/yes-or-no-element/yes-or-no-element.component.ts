import { Component, OnInit, forwardRef } from '@angular/core';
import { ShortAnswerComponent } from '../short-answer/short-answer.component';
import { NG_VALUE_ACCESSOR, NG_VALIDATORS } from '@angular/forms';
import { FormBlockComponent } from '../form-block.component';

@Component({
  selector: 'lf-yes-or-no-element',
  templateUrl: './yes-or-no-element.component.html',
  styleUrls: ['./yes-or-no-element.component.css'],
  providers: [
    {
      multi: true,
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => YesOrNoElementComponent),
    }
  
  ],
})
export class YesOrNoElementComponent  extends FormBlockComponent<string> implements OnInit  {

  selectedCommit: string= '';
  override ngOnInit(): void {
  }
  
 changeAnswer(a:string) {
    this.changeCommit(a);
    this.selectedCommit = a;
    console.log(this.selectedCommit);
    
  }
}
