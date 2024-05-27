import { Component, OnInit, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import * as shortid from 'shortid';
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
export class FileUploadElementComponent
  extends FormBlockComponent<File | null, { fileName: string }>
  implements OnInit {
  fileName: string = '';

  override ngOnInit(): void {}

  onFileSelected(file: File | null): void {
    if (file) {
      this.fileName = file.name;
    } else {
      this.fileName = '';
    }

    this.changeCommit(file);
    this.store.dispatch(
      updateBlock({
        blockId: this.id,
        quest_meta: {
          fileName: this.fileName,
        },
      })
    );
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
