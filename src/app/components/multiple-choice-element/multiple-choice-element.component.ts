import { QuestionElement } from '@/shared/models/questionElement.model';
import { Component, OnInit, forwardRef } from '@angular/core';
import * as shortid from 'shortid';
import { FormBlockComponent } from '../form-block.component';
import { removeBlock, updateBlock } from '@/app/store/actions/builder.actions';
import { debounce } from '@/shared/utils/timing';

import { NG_VALUE_ACCESSOR } from '@angular/forms';

export class MultipleChoiceOption {
  constructor(val?: string) {
    this.value = val;
  }
  value?: string;
  key: string = shortid.generate();
}

@Component({
  selector: 'lg-multiple-choice-element',
  templateUrl: './multiple-choice-element.component.html',
  styleUrls: ['./multiple-choice-element.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MultipleChoiceElementComponent),
      multi: true,
    },
  ],
})
export class MultipleChoiceElementComponent
  extends FormBlockComponent<
    QuestionElement<{ options?: MultipleChoiceOption[] }>
  >
  implements OnInit
{
  onValueChange(key: string, evt: any) {
    if (evt.target.checked && this.mode === 'live') {
      const isSelected = evt.target.checked;
      if (isSelected) console.log(evt.target.value);
      // this.store.dispatch(updateBlock({
      //   blockId:this.value?.quest_id as string,
      //   quest_meta:{
      //     options:[]
      //   }
      // }))
    }
    this.changeCommit([] as any);
  }

  override ngOnInit(): void {}

  public updateQuestLabel = debounce((evt: any) => {
    const updatedValue = evt.target.value;
    this.store.dispatch(
      updateBlock({
        blockId: this.value?.quest_id as string,
        questLabel: updatedValue,
      })
    );
  }, 1000);

  addChoice() {
    const op = new MultipleChoiceOption();
    const options = this.value?.quest_meta?.options || [];
    this.store.dispatch(
      updateBlock({
        blockId: this.value?.quest_id as string,
        quest_meta: {
          options: [...options, op],
        },
      })
    );
  }
  removeChoice(key: string) {
    const options = this.value?.quest_meta?.options || [];

    const updatedOptions = options.filter(
      (opt: MultipleChoiceOption) => opt.key !== key
    );

    this.store.dispatch(
      updateBlock({
        blockId: this.value?.quest_id as string,
        quest_meta: {
          options: updatedOptions,
        },
      })
    );
  }

  debounceChoiceInput = debounce((key: string, value: string) => {
    const options = this.value?.quest_meta?.options || [];

    const newOptions = options.map((opt: MultipleChoiceOption) => {
      if (opt.key === key) {
        return { ...opt, value: value };
      } else {
        return opt;
      }
    });

    this.store.dispatch(
      updateBlock({
        blockId: this.value?.quest_id as string,
        quest_meta: {
          options: newOptions,
        },
      })
    );
  });

  updateChoice(event: any, key: string) {
    const currentValue = event.target.value;
    this.debounceChoiceInput(key, currentValue);
  }
  removeBlock(){
    this.store.dispatch(
      removeBlock({
        blockId:this.value?.quest_id as string
      })
    )

  }
}
