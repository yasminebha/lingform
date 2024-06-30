import { updateBlock } from '@/app/store/actions/builder.actions';
import { AppState } from '@/app/store/reducers';
import { debounce } from '@/shared/utils/timing';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';

@Component({
  selector: 'lg-number-slider',
  templateUrl: './number-slider.component.html',
  styleUrls: ['./number-slider.component.css']
})
export class NumberSliderComponent implements OnInit {
  maxFile:number=1
  @Input() blockId!:string;
  @Input()maxRangeNumber?:number
  constructor(private store: Store<AppState>) { }


   onSliderChange = (evt: any) => {
    
    this.store.dispatch(
      updateBlock({
        blockId: this.blockId,
        quest_meta: {
          maxFileNumber: evt.target.value,
        },
      })
    );
  }
  
  

  ngOnInit(): void {
    this.store
    .select((state) => state.builder)
    .subscribe(async ({ blocks }) => {
    this.maxFile= blocks[this.blockId]['quest_meta']['maxFileNumber']
  
    }).unsubscribe()
  }


}
