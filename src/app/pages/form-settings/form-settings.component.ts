import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { updateBuilder } from '@/app/store/actions/builder.actions';
import { BuilderState } from '@/app/store/reducers/builder';
import { AppState } from '@/app/store/reducers';
import { distinctUntilChanged, Subscription } from 'rxjs';
import { FormService } from '@/shared/services/form.service';
import { Form } from '@/shared/models/form.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-form-settings',
  templateUrl: './form-settings.component.html',
  styleUrls: ['./form-settings.component.css']
})
export class FormSettingsComponent implements OnInit, OnDestroy {
  settings: BuilderState['settings'] = {
    openTime: '',
    closeTime: '',
    acceptResponses: true,
    requireLogin: false,
  };
  form!:Form
  storeSubscription = new Subscription();
  builderState: any;

  constructor(private store: Store<AppState>, private fs: FormService, private readonly route: ActivatedRoute,
  ) {}

  async ngOnInit(): Promise<void> { 
    const formId = this.route.snapshot.paramMap.get('id');

    this.storeSubscription = this.store
      .select((state) => state.builder)
      .pipe(distinctUntilChanged())
      .subscribe(async (builderState) => {
        this.settings = { ...builderState.settings };
       this.fs.autoSave(builderState);
      });
      if(formId)
      this.form = await this.fs.getFormById(formId);
      if(this.form){
        this.store.dispatch(
          updateBuilder({
            form_id: this.form!.form_id,
            settings:this.form?.settings||{}
            
          })
        );
      }


  }

  ngOnDestroy(): void {
    if (this.storeSubscription) {
      this.storeSubscription.unsubscribe();
    }
  }

  updateSettings(): void {
    this.store.dispatch(updateBuilder({ settings: { ...this.settings } }));
  }
}
