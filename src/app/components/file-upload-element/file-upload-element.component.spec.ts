import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileUploadElementComponent } from './file-upload-element.component';

describe('FileUploadElementComponent', () => {
  let component: FileUploadElementComponent;
  let fixture: ComponentFixture<FileUploadElementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FileUploadElementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FileUploadElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
