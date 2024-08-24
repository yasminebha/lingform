import { QuestionElement } from '@/shared/models/questionElement.model';
import { Component, OnInit, forwardRef, OnDestroy } from '@angular/core';
import * as shortid from 'shortid';
import { FormBlockComponent } from '../form-block.component';
import { removeBlock, updateBlock } from '@/app/store/actions/builder.actions';
import { debounce } from '@/shared/utils/timing';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

export class MultipleChoiceOption {
  constructor(val?: string) {
    if (val) this.value = val;
  }
  value!: string;
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
  extends FormBlockComponent<string[], { options: MultipleChoiceOption[] }>
  implements OnInit, OnDestroy
{
  answers: string[] = [];
  options: MultipleChoiceOption[] = [];
  private subscription: Subscription = new Subscription();

  

  override ngOnInit(): void {
    // Subscribe to the  tostore get the current options from the state
    this.subscription.add(
      this.store.select(state => state.builder.blocks[this.id]?.quest_meta?.options)
        .subscribe((options: MultipleChoiceOption[]) => {
          if (options) {
            this.options = options;
            this.metaData = { options };
          }
        })
    );
  }

  onValueChange(key: string) {
    if (this.answers.includes(key)) {
      this.answers = this.answers.filter((a) => a !== key);
    } else {
      this.answers.push(key);
    }

    this.changeCommit(this.answers);
  }

  addChoice() {
    const op = new MultipleChoiceOption();
    const options = this.metaData?.options || [];
    this.store.dispatch(
      updateBlock({
        blockId: this.id,
        quest_meta: {
          options: [...options, op],
        },
      })
    );
  }

  removeChoice(key: string) {
    const options = this.metaData?.options || [];

    const updatedOptions = options.filter(
      (opt: MultipleChoiceOption) => opt.key !== key
    );

    this.store.dispatch(
      updateBlock({
        blockId: this.id,
        quest_meta: {
          options: updatedOptions,
        },
      })
    );
  }

  debounceChoiceInput = debounce((key: string, value: string) => {
    const options = this.metaData?.options || [];

    const newOptions = options.map((opt: MultipleChoiceOption) => {
      if (opt.key === key) {
        return { ...opt, value: value };
      } else {
        return opt;
      }
    });

    this.store.dispatch(
      updateBlock({
        blockId: this.id,
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

  ngOnDestroy() {
    this.subscription.unsubscribe(); // Clean up the subscription
  }
}
