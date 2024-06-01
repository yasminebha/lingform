import { Component, OnInit, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { FormBlockComponent } from '../form-block.component';
import { debounce } from '@/shared/utils/timing';
import { updateBlock } from '@/app/store/actions/builder.actions';

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
  fileNames: string[] = [];
  files:File[]=[]
  override ngOnInit(): void {}

  onFileSelected(files: File[] | null): void {
    if (files) {
      this.files=files
      this.fileNames = Array.from(files).map(file => file.name);
    } 

  }
  upload():void{
    
    // this.store.dispatch(
    //   updateBlock({
    //     blockId: this.id,
    //     quest_meta: {
    //       fileNames: this.fileNames,
    //     },
    //   })
    // );
     this.changeCommit(this.files);
      console.log(this.files);

      console.log(this.fileNames);
      
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
