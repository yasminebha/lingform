import { QuestionElement } from '@/shared/models/questionElement.model';
import { Component, OnInit } from '@angular/core';
import * as shortid from 'shortid';
import { FormBlockComponent } from '../form-block.component';
import { updateBlock } from '@/app/store/actions/builder.actions';
import { debounce } from '@/shared/utils/timing';

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
})
export class MultipleChoiceElementComponent
  extends FormBlockComponent<
    QuestionElement<{ options?: MultipleChoiceOption[] }>
  >
  implements OnInit
{
  onValueChange(key: string, evt: any) {
    // if (evt.target.checked && this.mode === 'live') {
    //   const isSelected = evt.target.checked;
    //   if(isSelected)
    //   console.log(evt.target.value);
    //   this.store.dispatch(updateBlock({
    //     blockId:this.value?.quest_id as string,
    //     quest_meta:{
    //       options:[]
    //     }
    //   }))
    // }
  }

  override ngOnInit(): void {
  
  }
  updateQuestLabel(evt: any): void {
    const debouncedUpdateLabel = debounce(()=>{
      const updatedValue = evt.target.value;
      this.store.dispatch(
      updateBlock({
        blockId: this.value?.quest_id as string,
        questLabel:updatedValue
      })
    );
    },1000)
    debouncedUpdateLabel();
  }

  addChoice() {
   
    const op = new MultipleChoiceOption();
    const options = this.value?.quest_meta?.options || []
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
    const options = this.value?.quest_meta?.options || []

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
    const options = this.value?.quest_meta?.options || []

    const newOptions = options.map(
      (opt: MultipleChoiceOption) => {
        if (opt.key === key) {
          return { ...opt, value: value };
        } else {
          return opt;
        }
      }
    );

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
}
