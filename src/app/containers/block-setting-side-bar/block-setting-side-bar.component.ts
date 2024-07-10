import { Component, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild, OnChanges, SimpleChanges } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '@/app/store/reducers';
import { QuestionElement } from '@/shared/models/questionElement.model';
import { BehaviorSubject, Subscription } from 'rxjs';
import { updateBlock } from '@/app/store/actions/builder.actions';
import { MultipleChoiceOption } from '@/app/components/multiple-choice-element/multiple-choice-element.component';
import { debounce } from '@/shared/utils/timing';

@Component({
  selector: 'lg-block-setting-side-bar',
  templateUrl: './block-setting-side-bar.component.html',
  styleUrls: ['./block-setting-side-bar.component.css']
})
export class BlockSettingSideBarComponent implements OnInit, OnChanges {
  _block = new BehaviorSubject<QuestionElement | null>(null);
  @Input() set block(value: QuestionElement | null) {
    this._block.next(value);
  }
  get block(): QuestionElement | null {
    return this._block.getValue();
  }

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
  @Input() isOpen = false;
  fileMimes: string[] = ["pdf", "docs", "doc", "csv", "zip", "rar", "jpg", "jpeg", "png", "mp3", "mp4", "pptx", "xls", "xlsx", "webp"];
  private settingsSubscription!: Subscription;
  choicesText: string = '';

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.isOpen = !!this.block;
    this.fetchBlockSettings();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['block'] && !changes['block'].firstChange) {
      this.fetchBlockSettings();
    }
  }

  fetchBlockSettings(): void {
    if (this.settingsSubscription) {
      this.settingsSubscription.unsubscribe();
    }

    if (this.block) {
      this.settingsSubscription = this.store
        .select(state => state.builder.blocks[this.block!.quest_id])
        .subscribe(block => {
          this._block.next(block);
          this.choicesText = block.quest_meta.options
            ? block.quest_meta.options.map((opt: MultipleChoiceOption) => opt.value).join('\n')
            : '';
        });
    }
  }

  updateChoices = debounce((evt: any) => {
    const options = evt.target.value
      .split('\n')
      .filter((choice: string) => choice.trim() !== '')
      .map((choice: string) => new MultipleChoiceOption(choice));
  
    if (this.block) {
      this.store.dispatch(
        updateBlock({
          blockId: this.block.quest_id,
          quest_meta: {
            ...this.block.quest_meta,
            options: options,
          },
        })
      );
    }
  }, 300);
  

  get settingsTemplate(): TemplateRef<any> | null {
    if (!this.block) return null;
    switch (this.block?.kind) {
      case 'MultipleChoiceElementComponent' ||'OneChoiceComponent':
        return this.multipleChoiceSettings;
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
    this.isOpen = false;
    this.close.emit();
  }

  ngOnDestroy(): void {
    if (this.settingsSubscription) {
      this.settingsSubscription.unsubscribe();
    }
  }
}
