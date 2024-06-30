import { Component, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../store/reducers';
import { BaseControlComponent } from '@/shared/ui-components/base-control.component';
import { QuestionService } from '@/shared/services/question.service';
import { addBlock, removeBlock, updateBlock, updateBlockOrder } from '../store/actions/builder.actions';
import * as shortid from 'shortid';
import { QuestionElement } from '@/shared/models/questionElement.model';

@Component({
  template: '',
})
export class FormBlockComponent<TValue, TMeta=any>
  extends BaseControlComponent<TValue, any>
  implements OnInit
{
  @Input()
  mode: 'edit' | 'live' = 'live';
  @Input()
  override value?: TValue;
  @Input()
  id: string="";
  @Input()
  kind: string="";
  @Input()
  required: boolean = true;
  @Input()
  metaData?: TMeta;
  @Input()
  label!:string;
  @Input()
  isInvalidBlock:boolean=false

  constructor(
    _renderer: Renderer2,
    _elementRef: ElementRef<any>,
     store: Store<AppState>,
     protected readonly questionService: QuestionService
  ) {
    super(_renderer, _elementRef,store);
  }

  override ngOnInit(): void {}
  async removeBlock(event: Event, blockId: string) {
    event.stopPropagation();
    event.preventDefault();
    await this.questionService.removeQuestionBlock(blockId);
    this.store.dispatch(removeBlock({ blockId }));

  }
  duplicateBlock() {

    
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
      kind: this.kind,
      questLabel: this.label,
      quest_id: newBlockId,
      required: this.required,
      quest_meta: { ...this.metaData },
    };
    this.store.dispatch(addBlock({ blockId: newBlockId, newBlock }));
    blockOrder.splice(blockOrder.indexOf(this.id),0,newBlockId)
    this.store.dispatch(updateBlockOrder({ blockOrder }));
  }
  onToggle(){
    if (this.required)
      this.required=false
    else
      this.required=true
  
    this.store.dispatch(
      updateBlock({
        blockId: this.id,
        required:this.required
      })
    );
    }
}

