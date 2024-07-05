import { updateBlock } from '@/app/store/actions/builder.actions';
import { AppState } from '@/app/store/reducers';
import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

@Component({
  selector: 'lg-number-slider',
  templateUrl: './number-slider.component.html',
  styleUrls: ['./number-slider.component.css']
})
export class NumberSliderComponent implements OnInit {
  @Input() blockId!: string;
  @Input() maxRangeNumber: number = 10;
  maxFile: number = 1;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.store
      .select((state) => state.builder)
      .subscribe(({ blocks }) => {
        this.maxFile = blocks[this.blockId]?.quest_meta?.maxFileNumber || 1;
      })
      .unsubscribe();
  }

  onSliderChange(evt: any): void {
    this.maxFile = evt.target.value;
    this.store.dispatch(
      updateBlock({
        blockId: this.blockId,
        quest_meta: {
          maxFileNumber: this.maxFile,
        },
      })
    );
  }
}
