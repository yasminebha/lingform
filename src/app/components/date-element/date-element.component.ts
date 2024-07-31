import { Component, OnInit, forwardRef } from '@angular/core';
import { FormBlockComponent } from '../form-block.component';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { debounce } from '@/shared/utils/timing';
import { updateBlock } from '@/app/store/actions/builder.actions';

@Component({
  selector: 'lg-date-element',
  templateUrl: './date-element.component.html',
  styleUrls: ['./date-element.component.css', '../short-answer/short-answer.component.css',],
  providers: [
    {
      multi: true,
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DateElementComponent),
    },
  ],
})
export class DateElementComponent
  extends FormBlockComponent<Date>
  implements OnInit
{
  override ngOnInit(): void {}

  changeAnswer(evt: any) {
    this.changeCommit(evt.target.value);
  }
}
