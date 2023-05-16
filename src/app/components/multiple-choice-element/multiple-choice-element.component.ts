import { Component, DoCheck, Input, OnInit, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import * as shortid from 'shortid';
import { FormBlockComponent } from '../form-block.component';

export class MultipleChoiceOption {

  constructor()
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
  providers: [
    {
      multi: true,
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MultipleChoiceElementComponent),
    },
  ],
})
export class MultipleChoiceElementComponent
  extends FormBlockComponent<MultipleChoiceOption[]>
  implements OnInit, DoCheck, ControlValueAccessor
{
  // checkboxOptions = checkboxList;

  @Input()
  override value: MultipleChoiceOption[] = [];

  onValueChange(key: string, evt: any) {
    if (evt.target.checked && this.mode==='live') {
      this.value.filter((val:MultipleChoiceOption)=>val.key!==key)
    }
  }

  override ngDoCheck(): void {
    super.ngDoCheck();
    this.changeCommit(this.value);
  }

  override ngOnInit(): void {
    if (this.mode === 'edit' && this.value.length === 0) {
      this.addChoice();
      this.addChoice();
    }
  }

  addChoice() {
    const op = new MultipleChoiceOption();
    this.value.push(op);
    this.changeCommit(this.value);
  }

  removeChoice(key: string) {
    if (this.value.length > 2) {
      this.value = this.value.filter(
        (opt: MultipleChoiceOption) => opt.key !== key
      );
    }

    this.changeCommit(this.value);
  }

  updateChoice(event: any, key: string) {
    const currentValue = event.target.value;

    const choice = this.value.find(
      (opt: MultipleChoiceOption) => opt.key === key
    );
    if (choice) {
      choice.value = currentValue;
      this.changeCommit(this.value);
    }
  }
}
