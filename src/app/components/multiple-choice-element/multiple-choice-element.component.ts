import { QuestionElement } from '@/shared/models/questionElement.model';
import { Component, Input, OnInit, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import * as shortid from 'shortid';
import { FormBlockComponent } from '../form-block.component';
import { updateBlock } from '@/app/store/actions/builder.actions';

export class MultipleChoiceOption {
  constructor();
  constructor(val?: string) {
    this.value = val;
  }

  key: string = shortid.generate();
  value?: string;
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
  // checkboxOptions = checkboxList;

  onValueChange(key: string, evt: any) {
    if (evt.target.checked && this.mode === 'live') {
      this.value?.quest_meta?.options?.filter(
        (val: MultipleChoiceOption) => val.key !== key
      );
    }
  }

  // override ngDoCheck(): void {
  //   super.ngDoCheck();
  //   this.changeCommit(this.value);
  // }

  override ngOnInit(): void {
    if (this.mode === 'edit' && this.value?.quest_meta?.options?.length === 0) {
      this.addChoice();
      this.addChoice();
    }
  }

  addChoice() {
    const op = new MultipleChoiceOption();

    // this.changeCommit(this.value);
    this.store.dispatch(
      updateBlock({
        blockId: this.value?.quest_id as string,
        quest_meta: {
          options: [...(this.value?.quest_meta?.options as []), op],
        },
      })
    );
  }

  removeChoice(key: string) {
    if (this.value?.quest_meta) {
      this.value.quest_meta.options = this.value?.quest_meta?.options?.filter(
        (opt: MultipleChoiceOption) => opt.key !== key
      );
    }

    // this.changeCommit(this.value);
  }

  updateChoice(event: any, key: string) {
    const currentValue = event.target.value;

    this.store.dispatch(
      updateBlock({
        blockId: this.value?.quest_id as string,
        quest_meta: {
          options: [...(this.value?.quest_meta?.options as []), currentValue],//leeeezm tetbadl
        },
      })
    );

    // const choice = this.value?.quest_meta?.options?.find(
    //   (opt: MultipleChoiceOption) => opt.key === key
    // );
    // if (choice) {
    //   choice.value = currentValue;
    //   // this.changeCommit(this.value);

    //   // this.store.dispatch(updateBlock({ blockId: this.value?.quest_id ,}));
    // }
  }
}
