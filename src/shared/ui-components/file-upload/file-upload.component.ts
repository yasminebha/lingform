import { Component, Input } from '@angular/core';

@Component({
  selector: 'lg-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent {
  @Input() isMultiple = true;
  @Input() isDisabled = false;

  selectedFiles: File[] = [];

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      const newFiles = Array.from(input.files);
      if (this.isMultiple) {
        this.selectedFiles.push(...newFiles);
      } else {
        this.selectedFiles = newFiles;
      }
    }
  }

  removeFile(index: number, event: MouseEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.selectedFiles.splice(index, 1);
  }
}
