import { Component, OnInit, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { FormBlockComponent } from '../form-block.component';
import { debounce } from '@/shared/utils/timing';
import { updateBlock } from '@/app/store/actions/builder.actions';

@Component({
  selector: 'lg-rating-element',
  templateUrl: './rating-element.component.html',
  styleUrls: ['./rating-element.component.css'],
  providers: [
    {
      multi: true,
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RatingElementComponent),
    },
  ],

})
export class RatingElementComponent  extends FormBlockComponent<{"rating":number}> implements OnInit {
  stars: boolean[] = [false, false, false, false, false];
  
  override ngOnInit(): void {
  }

  selectStar(rating: number): void {
    this.stars = this.stars.map((_, index) => index < rating);
    console.log(this.required);
    
    this.changeCommit({rating});
  }

}
