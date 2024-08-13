import { FileUploadElementComponent } from '@/app/components/file-upload-element/file-upload-element.component';
import {
  addBlock,
  changeBgColor,
  changeFormId,
  swapBlock,
  updateBlockOrder,
  updateBuilder,
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
import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
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
  blockOrder: string[] = [];
  coverImage: string = ''
  logoImage: string = ''
  submissionId: string = '';
   form!: Form;
  private storeSubscription: any;
  uploadType: 'cover' | 'logo' | null = null;
  showCoverUpload: boolean = false;
  showLogoUpload: boolean = false;

  @ViewChildren(FileUploadElementComponent)
  fileUploadComponents?: QueryList<FileUploadElementComponent>;

  @ViewChild('fileInput') fileInput!: ElementRef;

  @Output() blockSelected = new EventEmitter<QuestionElement>();

  @Input() mode!: 'live' | 'edit';
  invalidBlocks: { [blockId: string]: boolean } = {};

  constructor(
    private readonly store: Store<AppState>,
    private readonly formService: FormService,
    private readonly route: ActivatedRoute,
    private questService: QuestionService
  ) { }

  async ngOnInit(): Promise<void> {
    window.addEventListener('triggerFileUpload', this.triggerFileUpload.bind(this));
    const formId = this.route.snapshot.paramMap.get('id');

    this.storeSubscription = this.store
      .select((state) => state.builder)
      .pipe(distinctUntilChanged())
      .subscribe(
        async ({
          form_id,
          blocks,
          title,
          description,
          mode,
          backgroundColor,
          blockOrder,
          coverImage,
          logoImage
        }) => {
          this.mode = mode;
          this.bgColor = backgroundColor;

          if (Array.isArray(blockOrder)) {
            this.blockOrder = blockOrder;
            this.blocks = this.blockOrder
              .map((id) => blocks[id])
              .filter((block) => block !== undefined && block !== null);
          }
          this.title = title;
          this.description = description;
          this.formId = form_id;
          this.coverImage = coverImage
          this.logoImage = logoImage

          this.autoSave();
        }
      );

    if (formId) {
      this.form = await this.formService.getFormById(formId);
      for (const q of this.form!.question) {
        this.store.dispatch(addBlock({ blockId: q.quest_id, newBlock: q }));
      }
      if (this.form) {
    
        this.store.dispatch(
          updateBuilder({
            form_id:this.form!.form_id,
            title:this.form.title,
             coverImage: this.form?.coverImage,
             description: this.form?.description,
             blockOrder: this.form.blockOrder || [], 
             backgroundColor: this.form.bgColor,
             logoImage:this.form?.logoImage
             })
        );
      }

    }
  }

  ngOnDestroy() {
    window.removeEventListener('triggerFileUpload', this.triggerFileUpload.bind(this));
    this.storeSubscription.unsubscribe();
  }

 
  triggerFileUpload(event: any) {
    const type = event.detail;
    if (type === 'cover') {
      this.showCoverUpload = true;
    } else if (type === 'logo') {
      this.showLogoUpload = true;
    }
  }
  onBlockSettingsClick(block: QuestionElement) {
    this.blockSelected.emit(block);
  }
  updateBuilderTitle = debounce((evt: any) => {
    const updatedValue = evt.target.value;
    this.store.dispatch(updateBuilderTitle({ title: updatedValue }));
  }, 1000);

  updateBuilderDescription = debounce((evt: any) => {
    const updatedValue = evt.target.value;
    this.store.dispatch(
      updateBuilderDescription({ Description: updatedValue })
    );
  }, 1000);

  async onSubmit(f: NgForm): Promise<void> {
    const answers = [];
    let isValid = true;

    for (const key of Object.keys(f.value)) {
      const block = this.blocks.find((block) => block.quest_id === key);
      if (block && block.required && !f.value[key]) {
        this.invalidBlocks[key] = true;
        isValid = false;
      } else if (block) {
        const control = f.controls[key];
        const errors = control.errors;
        if (errors && (errors['invalidEmail'] || errors['invalidPhoneNumber'])) {
          this.invalidBlocks[key] = true;
          isValid = false;
        } else {
          this.invalidBlocks[key] = false;
        }
      }
    }

    if (this.fileUploadComponents) {
      for (const component of this.fileUploadComponents.toArray()) {
        const block = this.blocks.find(
          (block) => block.quest_id === component.id
        );
        if (block && block.required && component.files.length === 0) {
          this.invalidBlocks[component.id] = true;
          isValid = false;
        } else if (block) {
          this.invalidBlocks[component.id] = false;
          isValid = true
        }
      }
    }



    if (!isValid) {
      return;
    }


    try {
      this.submissionId = await this.formService.addSubmission(this.formId);

      if (this.fileUploadComponents) {
        for (const component of this.fileUploadComponents.toArray()) {
          const block = this.blocks.find(
            (block) => block.quest_id === component.id
          );
          if (component.files.length > 0) {
            try {

              const uploadedPaths = await Promise.all(
                component.files.map((file) =>
                  this.formService.uploadFile(
                    file,
                    `form_${block?.form_id}/sub_${this.submissionId}/quest_${block?.quest_id}/${file.name}`
                  )
                )
              );
              let publicUrls: string[] = []

              uploadedPaths.forEach(async path => {
                publicUrls.push(await this.formService.getPublicUrl(path))
              })

              component.changeCommit(publicUrls)

              publicUrls = []
            } catch (error) {
              console.error('Error uploading files:', error);
              return;
            }
          }
        }

      }
      for (const key of Object.keys(f.value)) {
        answers.push({
          quest_id: key,
          value: f.value[key],
        });
      }
      await this.formService.submitAnswers(answers, this.submissionId);
      alert('Response submitted');
    } catch (error) {
      console.error('Error submitting answers:', error);
    }
  }

 
  private autoSave = debounce(async () => {
    this.formService.setIsSaving(true);
    this.store
      .select((state) => state.builder)
      .pipe(distinctUntilChanged())
      .subscribe(
        async ({ blocks, title, description, form_id, blockOrder, backgroundColor, coverImage ,logoImage}) => {
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
            blockOrder: blockOrder,
            bgColor: backgroundColor,
            updated_at: new Date(),
            coverImage: coverImage,
            logoImage:logoImage
          };
          await this.formService.updateForm(form_id, updatedForm);
          this.formService.setIsSaving(false);
        }
      );

    console.log('Form auto-saved');
  }, 2000);

  drop(event: CdkDragDrop<QuestionElement[]>) {
    if (this.mode === 'edit') {
      moveItemInArray(this.blocks, event.previousIndex, event.currentIndex);
      const newOrder = this.blocks.map((block) => block.quest_id);

      if (this.blocks.length > 1)
        this.store.dispatch(updateBlockOrder({ blockOrder: newOrder }));
    }
  }
  async imageUpload(file: File,f:string): Promise<void> {
    if (file) {
      try {
        
        // await this.formService.deleteFilesInBucket('uploads', `form_${this.formId}/${f}/*`); not working need fixing
        const path = await this.formService.uploadFile(file, `form_${this.formId}/${f}/${file.name}`);
        const publicUrl = await this.formService.getPublicUrl(path);
        if(f==='cover'){

          this.store.dispatch(updateBuilder({ coverImage: publicUrl }));
        } if(f==='logo') {

          this.store.dispatch(updateBuilder({ logoImage: publicUrl }));
        }
         

      } catch (error) {
        console.error('Error uploading cover image:', error);
      }
    }
  }

  removeImage(type: 'cover' | 'logo'): void {
    let imageUrl = '';
    let fileName = '';
  
    if (type === 'cover') {
      imageUrl = this.coverImage;
      this.showCoverUpload = false;
    } else if (type === 'logo') {
      imageUrl = this.logoImage;
      this.showLogoUpload = false;
    }
  
    if (imageUrl) {
      const parts = imageUrl.split('/');
      fileName = parts[parts.length - 1]; 
      this.formService.deleteFilesInBucket('uploads', `form_${this.formId}/${type}/${fileName}`)
        .then(() => {
       
          if (type === 'cover') {
            this.coverImage = '';
          } else if (type === 'logo') {
            this.logoImage = '';
          }
  
          this.updateImageInStore(type, '');
        })
        .catch(error => {
          console.error('Failed to delete image from storage:', error);
        });
    }
  }

  updateImageInStore(type: 'cover' | 'logo', imageUrl: string): void {
    const updateData = type === 'cover' ? { coverImage: imageUrl } : { logoImage: imageUrl };
    this.store.dispatch(updateBuilder(updateData));
  }
 
}
