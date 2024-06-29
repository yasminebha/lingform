import { addBlock, updateBlockOrder } from '@/app/store/actions/builder.actions';
import { AppState } from '@/app/store/reducers';
import { QuestionElement } from '@/shared/models/questionElement.model';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as shortid from 'shortid';

@Component({
  selector: 'lg-left-side-bar',
  templateUrl: './left-side-bar.component.html',
  styleUrls: ['./left-side-bar.component.css'],
})
export class LeftSideBarComponent implements OnInit {
  constructor(private readonly store: Store<AppState>) {}

  ngOnInit(): void {}
  addElementBlock(componentType: string) {
    const newBlockId = shortid.generate();
    let form_id: string | null = '';
    let blockOrder:string[]= []
    this.store
      .select((state) => state.builder)
      .subscribe((builder) => {
        form_id = builder.form_id;
        blockOrder = [...builder.blockOrder];
      }).unsubscribe();

    const newBlock: QuestionElement = {
      form_id: form_id,
      kind: componentType,
      questLabel: '',
      quest_id: newBlockId,
      required: true,
      quest_meta: { options: [] },
    };

    this.store.dispatch(addBlock({ blockId: newBlockId, newBlock }));

    blockOrder.push(newBlockId);
    this.store.dispatch(updateBlockOrder({ blockOrder }));
  }
}
