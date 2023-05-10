import { Component, OnInit } from '@angular/core';
import { checkboxList } from '@/shared/mock-data/multiple-choice';
import * as shortid from 'shortid';
export type MultipleChoiceOption = { key: string; value: string };
@Component({
  selector: 'lg-multiple-choice-element',
  templateUrl: './multiple-choice-element.component.html',
  styleUrls: ['./multiple-choice-element.component.css'],
})
export class MultipleChoiceElementComponent implements OnInit {
  mode: 'edit' | 'live' = 'edit';
  checkboxOptions = checkboxList;
  options: MultipleChoiceOption[] = [];

  constructor() {}

  ngOnInit(): void {
    this.checkboxOptions = checkboxList;
    console.log(this.checkboxOptions);
    if (this.mode === 'edit') {
      this.addChoice();
      this.addChoice();
    }
  }
  onClick() {
    console.log('works');
  }
  addChoice() {
    this.options.push(
      { key: shortid.generate(), value: '' }
  
    );
  }
  removeChoice(key: string) {
    if (this.options.length > 2)
      this.options = this.options.filter((opt) => opt.key !== key);
  }
  updateChoice(event: any, key: string) {
    const value = event.target.value;

    const obj = this.options.find((opt) => opt.key === key);
    if (obj) {
      obj.value = value;
    }
    console.log(this.options);
  }
}
