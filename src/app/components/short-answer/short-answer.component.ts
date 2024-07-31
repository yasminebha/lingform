import { Component, OnInit, forwardRef } from '@angular/core';
import { FormBlockComponent } from '../form-block.component';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { debounce } from '@/shared/utils/timing';
import { updateBlock } from '@/app/store/actions/builder.actions';


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



  changeAnswer(evt: any) {
    this.changeCommit(evt.target.value);
  }
}
