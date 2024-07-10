import { updateBlock } from '@/app/store/actions/builder.actions';
import { AppState } from '@/app/store/reducers';
import { QuestionElement } from '@/shared/models/questionElement.model';
import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'lg-number-slider',
  templateUrl: './number-slider.component.html',
  styleUrls: ['./number-slider.component.css']
})
export class NumberSliderComponent implements OnInit, OnDestroy {
  @Input() block$!: BehaviorSubject<QuestionElement | null>;
  block: QuestionElement | null = null;
  @Input() maxRangeNumber: number = 10;
  maxFile: number = 1;
  private subscription!: Subscription;
  
  private maxFileChange$ = new Subject<number>();
  private maxFileChangeSubscription!: Subscription;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.subscription = this.block$.subscribe(block => {
      this.block = block;
    });

    this.maxFileChangeSubscription = this.maxFileChange$
      .pipe(
        debounceTime(300),
        distinctUntilChanged()
      )
      .subscribe(maxFile => {
        if (this.block) {
          const newQuestMeta = {
            ...this.block.quest_meta,
            maxFileNumber: maxFile,
          };
          this.store.dispatch(
            updateBlock({
              blockId: this.block.quest_id,
              quest_meta: newQuestMeta,
            })
          );
        }
      });
  }

  onSliderChange(evt: any): void {
    this.maxFile = evt.target.value;
    this.maxFileChange$.next(this.maxFile);
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    if (this.maxFileChangeSubscription) {
      this.maxFileChangeSubscription.unsubscribe();
    }
  }
}
