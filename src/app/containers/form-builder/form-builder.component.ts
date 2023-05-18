
import { updateBuilderDescription, updateBuilderTitle } from '@/app/store/actions/builder.actions';
import { AppState } from '@/app/store/reducers';
import { builderReducer } from '@/app/store/reducers/builder';
import { QuestionElement } from '@/shared/models/questionElement.model';
import { debounce } from '@/shared/utils/timing';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

@Component({
  selector: 'lg-form-builder',
  templateUrl: './form-builder.component.html',
  styleUrls: ['./form-builder.component.css'],
})
export class FormBuilderComponent implements OnInit {
  title: string = 'untitled Form';
  description:string = ""
  bgColor: string = '#FFF';
  blocks: QuestionElement[] = [];

  constructor(private readonly store: Store<AppState>) {}

  ngOnInit(): void {
    this.store.subscribe(({ builder }) => {
      this.bgColor = builder.backgroundColor;
      this.blocks = Object.values(builder.blocks);
      this.title=builder.title
      this.description=builder.description
   
    });
  }
  updateBuilderTitle(evt:any): void {
    const debouncedUpdateTitle  = debounce(() => {
    
      const updatedValue=evt.target.value
      this.store.dispatch(
        updateBuilderTitle({
          title: updatedValue,
        })
      );
    }, 1000);
    debouncedUpdateTitle ();
  }
  updateBuilderDescription(evt:any): void {
    const debouncedUpdateDescription  = debounce(() => {
      const updatedValue=evt.target.value
      this.store.dispatch(
        updateBuilderDescription({
          Description: updatedValue,
        })
        );
      }, 1000);
    debouncedUpdateDescription ();
  }

  // updateFieldValue(event: any) {
  //   const currentValue = event.target.value;
  //   console.log(currentValue);
  //     value = currentValue;
  //     this.changeCommit(this.value);
  //   }
  // }
}
