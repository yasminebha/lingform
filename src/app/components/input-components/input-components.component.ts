import { AppState } from '@/app/store/reducers';
import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngrx/store';

@Component({
  selector: 'lg-input-components',
  templateUrl: './input-components.component.html',
  styleUrls: ['./input-components.component.css'],
})
export class InputComponentsComponent implements OnInit {
  @Input()
  layout?: 'default' | 'second-layout' = 'default';

  @Input()
  title!: string;

  @Input()
  icon!: string;
  @Input()
  iconSize?: string;
  @Input()
  iconStyle: 'solid' | 'regular' | 'light' | 'thin' | 'duotone' = 'solid';
  constructor(private readonly store: Store<AppState>) {}

  ngOnInit(): void {}
 
}
