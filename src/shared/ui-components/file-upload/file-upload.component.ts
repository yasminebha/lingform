import { Component, EventEmitter, Input, Output, forwardRef, OnInit, OnDestroy } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { BaseControlComponent } from '../base-control.component';
import { Store } from '@ngrx/store';
import { AppState } from '@/app/store/reducers';
import { Subscription } from 'rxjs';

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
export class FileUploadComponent extends BaseControlComponent<File[], HTMLInputElement> implements OnInit, OnDestroy {
  selectedFiles: File[] = [];
  maxFiles: number = 1;
  allowedExtensions: string[] = [];
  @Input() isMultiple = true;
  @Input() isDisabled = false;
  @Input() blockId!: string;
  @Output() errMsg: string = "";
  @Output() valueChange: EventEmitter<File[]> = new EventEmitter<File[]>();
  
  private storeSubscription!: Subscription;

  override ngOnInit(): void {
    this.storeSubscription = this.store
      .select((state) => state.builder)
      .subscribe(({ blocks }) => {
        const block = blocks[this.blockId];
        if (block) {
          this.maxFiles = block.quest_meta.maxFileNumber;
          this.allowedExtensions = block.quest_meta.selectedOptions || []; // Assuming selectedOptions contains file extensions
        }
      });
  }

   ngOnDestroy(): void {
    if (this.storeSubscription) {
      this.storeSubscription.unsubscribe();
    }
  }

  override writeValue(value: File[] | null): void {
    if (value) {
      this.selectedFiles = value;
      this.emitValueChange(value);
    } 
  }

  emitValueChange(value: File[]): void {
    this.valueChange.emit(value);
  }

  getAllowedExtensionsString(): string {
    return this.allowedExtensions.join(', ');
  }

  isFileExtensionAllowed(file: File): boolean {
    const fileExtension = file.name.split('.').pop()?.toLowerCase();
    return this.allowedExtensions.includes(fileExtension || '');
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      const newFiles = Array.from(input.files);
      const validFiles = newFiles.filter(file => this.isFileExtensionAllowed(file));
      
      if (validFiles.length !== newFiles.length) {
        this.errMsg = `Some files have invalid types. Allowed types are: ${this.getAllowedExtensionsString()}`;
      } else if (this.selectedFiles.length + validFiles.length > this.maxFiles) {
        this.errMsg = `The maximum number of files is ${this.maxFiles}`;
      } else {
        this.selectedFiles = this.isMultiple ? [...this.selectedFiles, ...validFiles] : [validFiles[0]];
        this.emitValueChange(this.selectedFiles);
        this.errMsg = "";
      }
    }
  }

  removeFile(index: number, event: MouseEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.selectedFiles.splice(index, 1);
    this.emitValueChange(this.selectedFiles);
  }
}
