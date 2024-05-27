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
  public updateQuestLabel = debounce((evt: any) => {
    const updatedValue = evt.target.value;
    this.store.dispatch(
      updateBlock({
        blockId: this.id,
        questLabel: updatedValue,
      })
    );
  }, 1000);
  changeAnswer(evt: any) {
    this.changeCommit(evt.target.value);
  }
}
