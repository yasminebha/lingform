import {
  addBlock,
  changeFormId,
  updateBuilderDescription,
  updateBuilderTitle,
} from '@/app/store/actions/builder.actions';
import { AppState } from '@/app/store/reducers';
import { Form } from '@/shared/models/form.model';
import { QuestionElement } from '@/shared/models/questionElement.model';
import { FormService } from '@/shared/services/form.service';
import { QuestionService } from '@/shared/services/question.service';
import { debounce } from '@/shared/utils/timing';
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
  formId: string | null = '';

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
    this.storeSubsription = this.store
    .select((state) => state.builder)
    .pipe(distinctUntilChanged())
    
    .subscribe(async({ blocks, title, description,mode,backgroundColor}) => {
      this.mode = mode;
      this.bgColor = backgroundColor;
      this.blocks = Object.values(blocks);
      this.title = title;
      this.description = description;
      this.autoSave();
    });

    const formId = this.route.snapshot.paramMap.get('id');

    if (formId) {
      this.form = await this.formService.getFormById(formId);
 
      for (const q of this.form!.question) {
        this.store.dispatch(addBlock({ blockId: q.quest_id, newBlock: q }));
      }
      if (this.form) {
        this.store.dispatch(updateBuilderTitle({ title: this.form?.title }));
        this.store.dispatch(
          updateBuilderDescription({ Description: this.form?.description })
        );
      }

      this.store.dispatch(
        changeFormId({
          id: this.form!.form_id,
        })
      );
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
      .subscribe(async ({ blocks, title, description, form_id }) => {
      
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
        };
        await this.formService.updateForm(form_id, updatedForm);
      });

    console.log('Form auto-saved');
  }, 2000); 
}

