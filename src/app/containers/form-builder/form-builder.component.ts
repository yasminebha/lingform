import { FileUploadElementComponent } from '@/app/components/file-upload-element/file-upload-element.component';
import {
  addBlock,
  changeBgColor,
  changeFormId,
  resetBuilderState,
  swapBlock,
  updateBlockOrder,
  updateBuilder,
  updateBuilderDescription,
  updateBuilderTitle,
} from '@/app/store/actions/builder.actions';
import { AppState } from '@/app/store/reducers';
import { Form } from '@/shared/models/form.model';
import { QuestionElement } from '@/shared/models/questionElement.model';
import { AiFormService } from '@/shared/services/ai-form.service';
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
import * as shortid from 'shortid';

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
  bgImage: string = '';
  form!: Form;
  private storeSubscription: any;
  uploadType: 'cover' | 'logo' | null = null;
  showCoverUpload: boolean = false;
  showLogoUpload: boolean = false;
  userPrompt: string = ''

  @ViewChildren(FileUploadElementComponent)
  fileUploadComponents?: QueryList<FileUploadElementComponent>;

  @ViewChild('fileInput') fileInput!: ElementRef;

  @Output() blockSelected = new EventEmitter<QuestionElement>();

  @Input() mode!: 'live' | 'edit';
  invalidBlocks: { [blockId: string]: boolean } = {};
  isLoading: boolean=false;


  elementQuantities = {
    multipleChoice: 0,
    oneChoice: 0,
    shortAnswer: 0,
    rating: 0,
    email: 0,
    phone: 0,
    fileUpload: 0,
    yesOrNo: 0
  };
  constructor(
    private readonly store: Store<AppState>,
    private readonly formService: FormService,
    private readonly route: ActivatedRoute,
    private questService: QuestionService,
    private aiFormService: AiFormService
  ) { }

  async ngOnInit(): Promise<void> {
    const formId = this.route.snapshot.paramMap.get('id');
    window.addEventListener('triggerFileUpload', this.triggerFileUpload.bind(this));
  
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
          logoImage,
          bgImage
        }) => {
          this.formId = form_id;
          this.mode = mode;
          this.bgColor = backgroundColor;
  
          if (Array.isArray(blockOrder)) {
            // Clone the blockOrder array to ensure it's mutable
            this.blockOrder = [...blockOrder]; 
            this.blocks = this.blockOrder
              .map((id) => blocks[id])
              .filter((block) => block !== undefined && block !== null);
          }
          this.title = title;
          this.description = description;
          this.coverImage = coverImage;
          this.logoImage = logoImage;
          this.bgImage = bgImage;
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
            form_id: this.form!.form_id,
            title: this.form.title,
            coverImage: this.form?.coverImage,
            description: this.form?.description,
            blockOrder: this.form.blockOrder || [],
            backgroundColor: this.form.bgColor,
            logoImage: this.form?.logoImage,
            bgImage: this.form?.bgImage
          })
        );
      }
      //console.log(this.blockOrder);
      
    }
  }

  ngOnDestroy() {
    window.removeEventListener('triggerFileUpload', this.triggerFileUpload.bind(this));
    this.storeSubscription.unsubscribe();
  }

  updateUserPrompt(evt: any) {
    this.userPrompt = evt.target.value
    console.log(this.userPrompt);

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
        async ({ blocks, title, description, form_id, blockOrder, backgroundColor, coverImage, logoImage, bgImage }) => {
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
            logoImage: logoImage,
            bgImage: bgImage

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
  async imageUpload(file: File, role: string): Promise<void> {
    if (file) {
      try {

        // await this.formService.deleteFilesInBucket('uploads', `form_${this.formId}/${f}/*`); not working need fixing
        const path = await this.formService.uploadFile(file, `form_${this.formId}/${role}/${file.name}`);
        const publicUrl = await this.formService.getPublicUrl(path);
        if (role === 'cover') {

          this.store.dispatch(updateBuilder({ coverImage: publicUrl }));
        } if (role === 'logo') {

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


  async generateFormWithAI(prompt: string) {
    if (prompt) {
      try {
 
        let blockOrder:string[]= []
        this.isLoading = true
       await this.questService.removeAllQuestionByFormId(this.formId);
        this.store.dispatch(resetBuilderState());
        const response = await this.aiFormService.generateForm(prompt).toPromise();
        const formStructure = response.formStructure;
  
        this.store.dispatch(updateBuilderTitle({ title: formStructure.title }));
        this.store.dispatch(updateBuilderDescription({ Description: formStructure.description }));
  
        formStructure.questions.forEach((question: any) => {
          const newBlockId = shortid.generate();
  
          let kind: string;
          switch (question.type) {
            case 'multiple-choice':
              kind = 'MultipleChoiceElementComponent';
              break;
            case 'one-choice':
              kind = 'OneChoiceComponent';
              break;
            case 'short-answer':
              kind = 'ShortAnswerComponent';
              break;
            case 'rating':
              kind = 'RatingElementComponent';
              break;
            case 'email':
              kind = 'EmailElementComponent';
              break;
            case 'phone':
              kind = 'PhoneElementComponent';
              break;
            case 'file-upload':
              kind = 'FileUploadElementComponent';
              break;
            case 'yes-or-no':
              kind = 'YesOrNoElementComponent';
              break;
            default:
              kind = 'ShortAnswerComponent';
          }
  
          const block: QuestionElement = {
            quest_id: newBlockId,
            form_id: this.formId,
            kind: kind,
            questLabel: question.label,
            required: true,
            quest_meta: {
              options: question.options || [],
            },
          };
  
          // Add the new block and update blockOrder
          this.store.dispatch(addBlock({ blockId: newBlockId, newBlock: block }));
          blockOrder.push(newBlockId)
          console.log(blockOrder);
          
        });
        this.store.dispatch(updateBlockOrder({ blockOrder }));
  
        // Dispatch updated blockOrder to the store
     this.isLoading = false
      } catch (error) {
        alert("there was a problem while generating the form")
        console.error('Error generating form with AI:', error);
        this.isLoading = false
      }
    } else {
      alert('Please enter a form description!');
    }
  }
  



}
