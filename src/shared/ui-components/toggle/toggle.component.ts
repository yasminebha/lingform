import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '@/app/store/reducers';
import { updateBlock } from '@/app/store/actions/builder.actions';
import { QuestionElement } from '@/shared/models/questionElement.model';
import { BehaviorSubject, Subscription } from 'rxjs';

@Component({
  selector: 'lf-toggle',
  templateUrl: './toggle.component.html',
  styleUrls: ['./toggle.component.css'],
})
export class ToggleComponent implements OnInit, OnDestroy {
  @Input() block$!: BehaviorSubject<QuestionElement | null>;
  block: QuestionElement | null = null;
  private subscription!: Subscription;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.subscription = this.block$.subscribe(block => {
      this.block = block;
    });
  }

  onToggle() {
    if (this.block) {
      this.store.dispatch(
        updateBlock({
          blockId: this.block.quest_id,
          required: !this.block.required,
        })
      );
    }
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
