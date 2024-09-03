import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { updateBuilder } from '@/app/store/actions/builder.actions';
import { BuilderState } from '@/app/store/reducers/builder';
import { AppState } from '@/app/store/reducers';
import { distinctUntilChanged, Subscription } from 'rxjs';
import { FormService } from '@/shared/services/form.service';
import { Form } from '@/shared/models/form.model';

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

  constructor(private store: Store<AppState>, private fs: FormService) {}

  ngOnInit(): void { 
    this.storeSubscription = this.store
      .select((state) => state.builder)
      .pipe(distinctUntilChanged())
      .subscribe(async (builderState) => {
        this.settings = { ...builderState.settings };

        this.fs.autoSave(builderState);
      });
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
