import { updateBuilder } from '@/app/store/actions/builder.actions';
import { AppState } from '@/app/store/reducers';
'@/shared/services/form.service';
import { Component,  OnInit } from '@angular/core';

import { Store } from '@ngrx/store';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css'],
})
export class ViewComponent implements OnInit {
 
  mode:'live'|'edit'='live'
  constructor(
  private store:Store<AppState>
  ) {}

  async ngOnInit(): Promise<void> {
      this.store.dispatch(updateBuilder({ 
        mode:this.mode
      }));
    
  }


}
