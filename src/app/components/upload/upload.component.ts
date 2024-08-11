import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'lf-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css'],

})
export class UploadComponent {
  @Input() fileType: 'image' | 'video' = 'image'; // Determines the type of file (image or video)
  @Input() fileUrl: string | null = null; // URL of the currently uploaded file (if any)
  @Input() mode: 'edit' | 'live' = 'edit'; // Determines whether the component is in edit or live mode
  @Input() placeholderText: string = 'Click here to upload'; // Text to display when no file is uploaded
  @Input() uploadPath: string = ''; // Path where the file should be uploaded
  @Input() classes: string=''
  @Output() fileUploaded = new EventEmitter<File>(); // Event emitted when a file is selected for upload

  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input?.files && input.files.length > 0) {
      this.fileUploaded.emit(input.files[0]);
    }
  }
}
