import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  forwardRef,
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { BaseControlComponent } from '../base-control.component';

@Component({
  selector: 'lg-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FileUploadComponent),
      multi: true,
    },
  ],
})
export class FileUploadComponent
  extends BaseControlComponent<File | null, HTMLInputElement>
  implements OnInit {

  @Input() label?: string;
  @Input() isDisabled: boolean = false;
  @Input() errorMsg: string = "";
  @Input() invalidControl: boolean = false;
  @Input() isMultiple:boolean = false;
  @Input() fileNumber:number=1;
  @Input() fileTypes:string[]=[];
  @Output() valueChange: EventEmitter<File | null> = new EventEmitter<File | null>();

  selectedFileName?: string;

  override ngOnInit(): void {}

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.value = input.files[0];
      this.selectedFileName = this.value.name;
      this.emitValueChange(this.value);
    } else {
      this.clearFile();
    }
  }

  clearFile(): void {
    this.value = null;
    this.selectedFileName = undefined;
    this.emitValueChange(this.value);
  }

  emitValueChange(value: File | null): void {
    this.valueChange.emit(value);
  }

  isInvalid(): boolean {
    return this.invalidControl;
  }
}
