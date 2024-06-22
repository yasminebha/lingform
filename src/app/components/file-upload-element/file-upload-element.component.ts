import { Component, ElementRef, OnInit, Renderer2, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { FormBlockComponent } from '../form-block.component';
import { debounce } from '@/shared/utils/timing';
import { updateBlock } from '@/app/store/actions/builder.actions';
import { FormService } from '@/shared/services/form.service';
import { QuestionService } from '@/shared/services/question.service';
import { Store } from '@ngrx/store';
import { AppState } from '@/app/store/reducers';
import * as shortid from 'shortid';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'lg-file-upload-element',
  templateUrl: './file-upload-element.component.html',
  styleUrls: ['./file-upload-element.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FileUploadElementComponent),
      multi: true,
    },
  ],
})
export class FileUploadElementComponent extends FormBlockComponent<File[] | null, { fileNames: string[] }> implements OnInit {
  formId:string|null=''
  fileNames: string[] = [];
  files:File[]=[]
  override ngOnInit(): void {
    if(this.route)
    this.formId = this.route.snapshot.paramMap.get('id');
   
  }

  constructor(
    _renderer: Renderer2,
    _elementRef: ElementRef<any>,
    protected override store: Store<AppState>,
     protected override readonly questionService: QuestionService,
     protected formService:FormService,
     private route: ActivatedRoute,
  ) {
    super(_renderer, _elementRef,store,questionService);
  }

  onFileSelected(files: File[] | null): void {
    if (files) {
      this.files = files;
      this.fileNames = files.map(file => file.name);
      // this.changeCommit(files);
    } else {
      this.files = [];
      this.fileNames = [];
    }
  }
  async upload(): Promise<void> {
    try {
    
      await Promise.all(this.files.map(file=>{

        this.formService.uploadFile(file,`form_${this.formId}/quest_${this.id}/${file.name+'#'+shortid.generate()}`)
     
      })
     )

     

      // uploadedFiles = await Promise.all(this.files.map(file => this.formService.uploadFile(file, `form_${this.form_id}/${this.id}/${shortid.generate()}/${file.name}`)));

      
    } catch (error) {
      console.error('Error uploading files:', error);
    }
  }
  public updateQuestLabel = debounce((evt: any) => {
    const updatedValue = evt.target.value;
    this.store.dispatch(
      updateBlock({
        blockId: this.id,
        questLabel: updatedValue,
      })
    );
  }, 1000);
}
