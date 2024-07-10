import { updateBlock } from '@/app/store/actions/builder.actions';
import { AppState } from '@/app/store/reducers';
import { QuestionElement } from '@/shared/models/questionElement.model';
import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'lg-checkbox-list',
  templateUrl: './checkbox-list.component.html',
  styleUrls: ['./checkbox-list.component.css']
})
export class CheckboxListComponent implements OnInit, OnDestroy {
  @Input() optionsData: string[] = [];
  selectedOptions: string[] = [];
  @Input() block$!: BehaviorSubject<QuestionElement | null>;
  block: QuestionElement | null = null;
  private subscription!: Subscription;

  private selectionChange$ = new Subject<string[]>();
  private selectionChangeSubscription!: Subscription;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.subscription = this.block$.subscribe(block => {
      if (block) {
        this.block = block;
        // Initialize selectedOptions from block.quest_meta
        this.selectedOptions = block.quest_meta?.selectedOptions || [];
      }
    });

    this.selectionChangeSubscription = this.selectionChange$
      .pipe(
        debounceTime(300),
        distinctUntilChanged()
      )
      .subscribe(selectedOptions => {
        if (this.block) {
          const newQuestMeta = {
            ...this.block.quest_meta,
            selectedOptions: selectedOptions,
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

  isSelected(option: string): boolean {
    return this.selectedOptions.includes(option);
  }

  onSelect(event: Event): void {
    const input = event.target as HTMLInputElement;
    const value = input.value;
    const checked = input.checked;

    if (checked) {
      this.selectedOptions = [...this.selectedOptions, value];
    } else {
      this.selectedOptions = this.selectedOptions.filter(option => option !== value);
    }

    this.selectionChange$.next(this.selectedOptions);
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    if (this.selectionChangeSubscription) {
      this.selectionChangeSubscription.unsubscribe();
    }
  }
}
