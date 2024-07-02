import { Component, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';

@Component({
  selector: 'lg-block-setting-side-bar',
  templateUrl: './block-setting-side-bar.component.html',
  styleUrls: ['./block-setting-side-bar.component.css']
})
export class BlockSettingSideBarComponent implements OnInit {
  @Input() block: any;

  @ViewChild('multipleChoiceSettings') multipleChoiceSettings!: TemplateRef<any>;
  @ViewChild('oneChoiceSettings') oneChoiceSettings!: TemplateRef<any>;
  @ViewChild('emailSettings') emailSettings!: TemplateRef<any>;
  @ViewChild('dateSettings') dateSettings!: TemplateRef<any>;
  @ViewChild('shortAnswerSettings') shortAnswerSettings!: TemplateRef<any>;
  @ViewChild('phoneSettings') phoneSettings!: TemplateRef<any>;
  @ViewChild('fileUploadSettings') fileUploadSettings!: TemplateRef<any>;
  @ViewChild('ratingSettings') ratingSettings!: TemplateRef<any>;
  @ViewChild('defaultSettings') defaultSettings!: TemplateRef<any>;

  @Output() close = new EventEmitter<void>();
  ngOnInit(): void {}
  get settingsTemplate(): TemplateRef<any> | null {
    if (!this.block) return null;

    switch (this.block.kind) {
      case 'MultipleChoiceElementComponent':
        return this.multipleChoiceSettings;
      case 'OneChoiceComponent':
        return this.oneChoiceSettings;
      case 'EmailElementComponent':
        return this.emailSettings;
      case 'DateElementComponent':
        return this.dateSettings;
      case 'ShortAnswerComponent':
        return this.shortAnswerSettings;
      case 'PhoneElementComponent':
        return this.phoneSettings;
      case 'FileUploadElementComponent':
        return this.fileUploadSettings;
      case 'RatingElementComponent':
        return this.ratingSettings;
      default:
        return this.defaultSettings;
    }
  }
  closeSettings() {
    this.close.emit();
  }
 
}
