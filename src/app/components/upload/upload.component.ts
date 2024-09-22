import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'lf-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css'],

})
export class UploadComponent {
  @Input() fileType: 'image' | 'video' = 'image'; 
  @Input() fileUrl: string | null = null; 
  @Input() mode: 'edit' | 'live' = 'edit'; 
  @Input() placeholderText: string = 'Click here to upload'; 
  @Input() uploadPath: string = ''; 
  @Input() classes: string=''

  @Input() role: 'cover' | 'logo' | 'background'|'avatar' = 'cover';

  @Output() fileUploaded = new EventEmitter<File>(); 
  @Output() removeFile = new EventEmitter<void>();
  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input?.files && input.files.length > 0) {
      this.fileUploaded.emit(input.files[0]);
    }
  }
  get roleClass(): string {
    switch (this.role) {
      case 'logo':
        return 'image-logo';
      case 'background':
        return 'image-background';
        case 'avatar':
          return 'image-avatar';
      default:
        return 'image-cover';
    }
  }
  onRemoveFile(): void {
    this.removeFile.emit();

      
  }
}
