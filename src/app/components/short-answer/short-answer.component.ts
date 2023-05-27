import { Component, OnInit, forwardRef } from '@angular/core';
import { FormBlockComponent } from '../form-block.component';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { debounce } from '@/shared/utils/timing';
import { removeBlock, updateBlock } from '@/app/store/actions/builder.actions';
import { QuestionElement } from '@/shared/models/questionElement.model';

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
  extends FormBlockComponent<QuestionElement>
  implements OnInit
{
  public updateQuestLabel = debounce((evt: any) => {
    const updatedValue = evt.target.value;
    console.log(this.value?.quest_id);
    
    this.store.dispatch(
      updateBlock({
        blockId: this.value?.quest_id as string,
        questLabel: updatedValue,
      })
    );
  }, 1000);


  
  removeBlock(){
    this.store.dispatch(
      removeBlock({
        blockId:this.value?.quest_id as string
      })
    )

  }
} 
