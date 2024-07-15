import { updateBlock } from '@/app/store/actions/builder.actions';
import { AppState } from '@/app/store/reducers';
import { QuestionElement } from '@/shared/models/questionElement.model';
import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Subscription } from 'rxjs';

@Component({
  selector: 'lf-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.css'],
})
export class DropdownComponent implements OnInit {
  constructor( private store: Store<AppState>) {}
 
  @Input()
  data: Array<{ key: any; label: string }> = [];
  formatData = ['MM/DD/YYYY','DD/MM/YYYY','YYYY-MM-DD']
  @Input() role :'dateFormatData'|'themeData'='themeData'

  @Input() block$!: BehaviorSubject<QuestionElement | null>;
  block: QuestionElement | null = null;
  defaultValue: string = '';

  private subscription!: Subscription;
    ngOnInit(): void {
      if(this.role==='dateFormatData'){
        this.subscription = this.block$.subscribe( block => {
          this.block = block;
        });
        this.defaultValue=this.block?.quest_meta.dateFormat
      
        
      }

    }
  

  updateDateFormat(evt: any) {
    
    const newFormat = evt.target.value;
    if (this.block) {
      this.store.dispatch(
        updateBlock({
          blockId: this.block.quest_id,
          quest_meta: {
            ...this.block.quest_meta,
            dateFormat: newFormat,
          },
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
