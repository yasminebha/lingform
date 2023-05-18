import { addBlock } from '@/app/store/actions/builder.actions';
import { AppState } from '@/app/store/reducers';
import { QuestionElement } from '@/shared/models/questionElement.model';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { take } from 'rxjs/operators';

@Component({
  selector: 'lg-left-side-bar',
  templateUrl: './left-side-bar.component.html',
  styleUrls: ['./left-side-bar.component.css'],
})
export class LeftSideBarComponent implements OnInit {
  constructor(private readonly store: Store<AppState>) {}

  ngOnInit(): void {}
  addElementBlock(componentType: string) {
    const sub = this.store
      .select('builder')
      .pipe(take(1))
      .subscribe((builder) => {
        const newBlockId = (Object.keys(builder.blocks).length + 1).toString();

        const newBlock: QuestionElement = {
          form_id: '1',
          kind: componentType,
          questLabel: '',
          quest_id: newBlockId,
          required: true,
          quest_meta: { options: [] },
        };

        this.store.dispatch(addBlock({ blockId: newBlockId, newBlock }));
      });
    sub.unsubscribe();
  }
  test() {
    console.log('heloo');
  }
}
