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
import { debounce } from '@/shared/utils/timing';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';

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
  mode: 'live' | 'edit' = 'edit';

  private form?: Form;
  private storeSubsription: any;

  constructor(
    private readonly store: Store<AppState>,
    private readonly formService: FormService,
    private readonly route: ActivatedRoute
  ) {}

  async ngOnInit(): Promise<void> {
    this.storeSubsription = this.store.subscribe(({ builder }) => {
      this.mode = builder.mode;
      this.bgColor = builder.backgroundColor;
      this.blocks = Object.values(builder.blocks);
      this.title = builder.title;
      this.description = builder.description;
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

    // const answers = Object.keys(f.value).reduce(
    //   (
    //     prev: {
    //       quest_id: string;
    //       value: string;
    //     }[],
    //     curr
    //   ) => {
    //     return [
    //       ...prev,
    //       {
    //         quest_id: curr,
    //         value: f.value[curr],
    //       },
    //     ];
    //   },
    //   []
    // );

    this.formService.submitAnswers(answers);
  }
}
