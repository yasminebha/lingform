import { Component, OnInit, forwardRef } from '@angular/core';
import { FormBlockComponent } from '../form-block.component';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'lg-short-answer',
  templateUrl: './short-answer.component.html',
  styleUrls: ['./short-answer.component.css'],
  providers: [
    {
      multi: true,
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ShortAnswerComponent),
    },
  ],
})
export class ShortAnswerComponent
  extends FormBlockComponent<string>
  implements OnInit
{
  override value: string = '';
  override ngOnInit(): void {}

  // override ngDoCheck(): void {
  //   super.ngDoCheck();
  //   this.changeCommit(this.value);
  // }
  updateQuestLabel(event: any) {
    const currentValue = event.target.value;
    console.log(currentValue);
    this.value = currentValue;
    // this.changeCommit(this.value);
  }
}
