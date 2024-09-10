import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '@/app/store/reducers';
import { updateBlock, updateBuilder } from '@/app/store/actions/builder.actions';
import { QuestionElement } from '@/shared/models/questionElement.model';
import { BehaviorSubject, Subscription } from 'rxjs';

@Component({
  selector: 'lf-toggle',
  templateUrl: './toggle.component.html',
  styleUrls: ['./toggle.component.css'],
})
export class ToggleComponent implements OnInit, OnDestroy {
  @Input() block$?: BehaviorSubject<QuestionElement | null>;
  @Input() role: 'change-block-required' | 'accept-responses' | 'login-required' = 'change-block-required';
  block: QuestionElement | null = null;
  private subscription!: Subscription;
  
  settings: any;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    if(this.block$){
      this.subscription = this.block$.subscribe(block => {
        this.block = block;
     
      });

    }
    if(this.role!=='change-block-required'){

     this.subscription=this.store
      .select((state) => state.builder).subscribe(({settings}) => {
        this.settings = settings;
      });
    }
  }

  onToggle() {
    if (this.role === 'change-block-required' && this.block) {
      this.store.dispatch(
        updateBlock({
          blockId: this.block.quest_id,
          required: !this.block.required,
        })
      );
    } else if (this.role === 'accept-responses') {
      this.store.dispatch(
        updateBuilder({
          settings: {
            ...this.settings,
            acceptResponses: !this.settings.acceptResponses,
          }
        })
      );
    } else if (this.role === 'login-required') {
      this.store.dispatch(
        updateBuilder({
          settings: {
            ...this.settings,
            requireLogin: !this.settings.requireLogin,
          }
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
