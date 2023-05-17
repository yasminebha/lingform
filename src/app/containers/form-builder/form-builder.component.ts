import { AppState } from '@/app/store/reducers';
import { QuestionElement } from '@/shared/models/questionElement.model';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

@Component({
  selector: 'lg-form-builder',
  templateUrl: './form-builder.component.html',
  styleUrls: ['./form-builder.component.css'],
})
export class FormBuilderComponent implements OnInit {
  bgColor: string = '#FFF';

  blocks: QuestionElement[] = [];

  constructor(private readonly store: Store<AppState>) {}

  ngOnInit(): void {
    this.store.subscribe(({ builder }) => {
      this.bgColor = builder.backgroundColor;

      this.blocks = Object.values(builder.blocks);
    });
  }

  // updateFieldValue(event: any) {
  //   const currentValue = event.target.value;
  //   console.log(currentValue);
  //     value = currentValue;
  //     this.changeCommit(this.value);
  //   }
  // }
}
