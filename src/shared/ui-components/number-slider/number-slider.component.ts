import { updateBlock } from '@/app/store/actions/builder.actions';
import { AppState } from '@/app/store/reducers';
import { QuestionElement } from '@/shared/models/questionElement.model';
import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Subscription } from 'rxjs';

@Component({
  selector: 'lg-number-slider',
  templateUrl: './number-slider.component.html',
  styleUrls: ['./number-slider.component.css']
})
export class NumberSliderComponent implements OnInit {
  @Input() block$!: BehaviorSubject<QuestionElement | null>;
  block: QuestionElement | null = null;
  @Input() maxRangeNumber: number = 10;
  maxFile: number = 1;
  private subscription!: Subscription;
  

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.subscription = this.block$.subscribe(block => {
      this.block = block;
    });
  }

  onSliderChange(evt: any): void {
    this.maxFile = evt.target.value;
    if(this.block)
    this.store.dispatch(
      updateBlock({
        blockId: this.block.quest_id,
        quest_meta: {
          maxFileNumber: this.maxFile,
        },
      })
    );

  }
  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
