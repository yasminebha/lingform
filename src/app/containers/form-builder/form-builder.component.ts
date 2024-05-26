import {
  addBlock,
  changeFormId,
  swapBlock,
  updateBlockOrder,
  updateBuilderDescription,
  updateBuilderTitle,
} from '@/app/store/actions/builder.actions';
import { AppState } from '@/app/store/reducers';
import { Form } from '@/shared/models/form.model';
import { QuestionElement } from '@/shared/models/questionElement.model';
import { FormService } from '@/shared/services/form.service';
import { QuestionService } from '@/shared/services/question.service';
import { debounce } from '@/shared/utils/timing';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'lg-form-builder',
  templateUrl: './form-builder.component.html',
  styleUrls: ['./form-builder.component.css'],
 
})
export class FormBuilderComponent implements OnInit, OnDestroy {
  title: string = 'untitled Form';
  description: string = '';
  bgColor: string | undefined = '#FFF';
  blocks: QuestionElement[] = [];
  formId: string = '';
  blockOrder:string[]=[]

  @Input()
  mode!: 'live' | 'edit' ;

  private form?: Form;
  private storeSubsription: any;

  constructor(
    private readonly store: Store<AppState>,
    private readonly formService: FormService,
    private readonly route: ActivatedRoute,
    private questService: QuestionService,
  ) {}

  async ngOnInit(): Promise<void> {
    const formId = this.route.snapshot.paramMap.get('id');
    this.storeSubsription = this.store
    .select((state) => state.builder)
    .pipe(distinctUntilChanged())
    
    .subscribe(async({ blocks, title, description,mode,backgroundColor,blockOrder}) => {
      this.mode = mode;
      this.bgColor = backgroundColor;
      this.blocks = blockOrder.map((id) => blocks[id]).filter(block => block);
      this.title = title;
      this.description = description;
      this.blockOrder = blockOrder;
     this.autoSave();
    })
   
  if(formId){

    this.form = await this.formService.getFormById(formId);
    this.store.dispatch(
      changeFormId({
        id: this.form!.form_id,
      })
    );
    for (const q of this.form!.question) {
      this.store.dispatch(addBlock({ blockId: q.quest_id, newBlock: q }));
    }
   
      if (this.form) {
        this.store.dispatch(updateBuilderTitle({ title: this.form?.title }));
        this.store.dispatch(updateBuilderDescription({ Description: this.form?.description }));
        this.store.dispatch(updateBlockOrder({ blockOrder: this.form?.blockOrder || [] }));
      }
  }
      
    
  }
  ngOnDestroy() {
    this.storeSubsription.unsubscribe();
  }

  updateBuilderTitle = debounce((evt: any) => {
    const updatedValue = evt.target.value;
    this.store.dispatch(
      updateBuilderTitle({
        title: updatedValue,
      })
    );
  }, 1000);

  updateBuilderDescription = debounce((evt: any) => {
    const updatedValue = evt.target.value;
    this.store.dispatch(
      updateBuilderDescription({
        Description: updatedValue,
      })
    );
  }, 1000);

  onSubmit(f: NgForm) {
    const answers = [];

    for (const key of Object.keys(f.value)) {
      answers.push({
        quest_id: key,
        value: f.value[key],
      });
    }
     this.formService.submitAnswers(answers);
    alert("response submited")
  }
  private autoSave = debounce(async () => {
    this.store
      .select((state) => state.builder)
      .pipe(distinctUntilChanged())
      .subscribe(async ({ blocks, title, description, form_id,blockOrder }) => {
      
        Object.values(blocks).forEach((block: any) => {
          const newBlock: QuestionElement = {
            quest_id: block.quest_id,
            form_id: block.form_id,
            kind: block.kind || null,
            questLabel: block.questLabel,
            required: block.required || false,
            quest_meta: block.quest_meta || {},
            
          };
          this.questService.addQuestionBlock(newBlock);
        });

        const updatedForm = {
          title: title,
          description: description,
          blockOrder:blockOrder
        };
        await this.formService.updateForm(form_id, updatedForm);
      });

    console.log('Form auto-saved');
  }, 2000); 

  
  drop(event: CdkDragDrop<QuestionElement[]>) {
    if(this.mode==="edit"){
      moveItemInArray(this.blocks, event.previousIndex, event.currentIndex);
      const newOrder = this.blocks.map(block => block.quest_id);
  
      
      this.store.dispatch(updateBlockOrder({ blockOrder: newOrder }));
    }
  
  }

  
}

