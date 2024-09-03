import { updateBuilder } from '@/app/store/actions/builder.actions';
import { AppState } from '@/app/store/reducers';
import { Form } from '@/shared/models/form.model';
import { FormService } from '@/shared/services/form.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { State, Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css'],
})
export class ViewComponent implements OnInit {
  mode: 'live' | 'edit' = 'live';
  shouldDisplayForm$!: Observable<boolean>;
  settings:any
  constructor(private store: Store<AppState>,private route:ActivatedRoute,private fs:FormService) {}
  storeSubscription = new Subscription();
form!:Form
  async ngOnInit(): Promise<void> {
    const formId = this.route.snapshot.paramMap.get('id')
   
      if(formId)
      this.form = await this.fs.getFormById(formId);
      if(this.form){
       this.settings= this.form.settings
      }
   
    this.store.dispatch(updateBuilder({ mode: this.mode }));
    console.log(this.settings);
    
  }

  private shouldDisplayForm(settings: any): boolean {
    const currentTime = new Date();
    const openTime = new Date(settings.openTime);
    const closeTime = new Date(settings.closeTime);

    return (
      settings.acceptResponses &&
      (!settings.openTime || currentTime >= openTime) &&
      (!settings.closeTime || currentTime <= closeTime)
    );
  }
}
