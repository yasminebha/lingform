import {
  changeBgColor,
  changeColor,
  updateBuilder,
} from '@/app/store/actions/builder.actions';
import { AppState } from '@/app/store/reducers';
import { getNextMode } from '@/app/store/selectors/builder.selectors';
import { QuestionElement } from '@/shared/models/questionElement.model';
import { FormService } from '@/shared/services/form.service';
import { QuestionService } from '@/shared/services/question.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Store, select } from '@ngrx/store';

@Component({
  selector: 'lg-right-side-bar',
  templateUrl: './right-side-bar.component.html',
  styleUrls: ['./right-side-bar.component.css'],
})
export class RightSideBarComponent implements OnInit {
  constructor(
    private readonly store: Store<AppState>,
    private questSevice: QuestionService,
    private formService:FormService
    ) {}
    fontOptions: Array<{ key: any; label: string }> = [];
  headerFontSizes: Array<{ key: any; label: string }> = [];
  questionFontSizes: Array<{ key: any; label: string }> = [];
  textFontSizes: Array<{ key: any; label: string }> = [];
  form_id:string=""

  showModal:boolean= false;
  @Output() fontChanged = new EventEmitter<string>();
  @Output() fontSizeChanged = new EventEmitter<string>();
  ngOnInit(): void {
    this.fontOptions = [
      { key: 'roboto', label: 'Roboto' },
      { key: 'inter', label: 'inter' },
      { key: 'sans-serif', label: 'sans-serif' },
    ];
    this.headerFontSizes = [
      { key: '18', label: '18' },
      { key: '19', label: '19' },
      { key: '20', label: '20' },
      { key: '21', label: '21' },
      { key: '22', label: '22' },
      { key: '23', label: '23' },
      { key: '24', label: '24' },
    ];
    this.questionFontSizes = [
      { key: '12', label: '12' },
      { key: '13', label: '13' },
      { key: '14', label: '14' },
      { key: '15', label: '15' },
      { key: '16', label: '16' },
      { key: '17', label: '17' },
      { key: '18', label: '18' },
    ];
    this.textFontSizes = [
      { key: '9', label: '9' },
      { key: '10', label: '10' },
      { key: '11', label: '11' },
      { key: '12', label: '12' },
    ];
    this.store
    .select((state) => state.builder).subscribe(({form_id})=>{
      if(form_id)
      this.form_id=form_id
    })
    
  }
  

  setFont(font: string) {
    this.fontChanged.emit(font);
  }

  setFontSize(size: string) {
    this.fontSizeChanged.emit(size);
  }
  
  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }
  
  
  
  async onSave() {
    this.store
      .select((state) => state.builder)
      .subscribe(async ({ blocks, title, description, form_id }) => {
        
        // Save blocks
        Object.values(blocks).forEach((block: any) => {
          const newBlock: QuestionElement = {
            quest_id: block.quest_id,
            form_id: block.form_id,
            kind: block.kind || null,
            questLabel: block.questLabel,
            required: block.required || false,
            quest_meta: block.quest_meta || {},
          };
          this.questSevice.addQuestionBlock(newBlock);
        });
  
        // Update form with formId, title, and description
        const updatedForm = {
          title: title,
          description: description
        };
        await this.formService.updateForm(form_id, updatedForm);
      });
  
    alert('Form has been saved');
  }
  
  
  handleHeaderFont($event: any) {
    console.log($event.target.value);
  }

  onBgColorChange(bgColor: string) {
    this.store.dispatch(changeBgColor({ bgColor: bgColor }));
  }

  onColorChange(color: string) {
    this.store.dispatch(changeColor({ color: color }));
  }
}
