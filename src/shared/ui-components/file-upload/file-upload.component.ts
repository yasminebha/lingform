import { Component, EventEmitter, Input, Output, forwardRef } from '@angular/core';
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
export class FileUploadComponent extends BaseControlComponent<File[], HTMLInputElement> {
  selectedFiles: File[] = [];
  @Input() maxFiles:number=1
  @Input() isMultiple = true;
  @Input() isDisabled = false;
  @Input() blockId!:string

  @Output() valueChange: EventEmitter<File[]> = new EventEmitter<File[]>();
  
  override writeValue(value: File[] | null): void {
    if (value) {
      this.selectedFiles = value;
      this.emitValueChange(value);
    } 
    
  }
   override ngOnInit(): void {
    
    this.store
    .select((state) => state.builder)
    .subscribe(async ({ blocks }) => {
    this.maxFiles= blocks[this.blockId]['quest_meta']['maxFileNumber']

    }).unsubscribe()
     

    console.log(this.selectedFiles);
    
  }

  emitValueChange(value: File[]): void {
    this.valueChange.emit(value);
  }

  onFileSelected(event: Event): void {
    debugger
    const input = event.target as HTMLInputElement;
    if (input.files) {
      const newFiles = Array.from(input.files);
      this.selectedFiles = this.isMultiple ? [...this.selectedFiles, ...newFiles] : [newFiles[0]];
      if(this.selectedFiles.length<this.maxFiles){
        this.emitValueChange(this.selectedFiles);

      }else{
        alert("the maximum number of files is "+this.maxFiles)
        this.selectedFiles=[]
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
