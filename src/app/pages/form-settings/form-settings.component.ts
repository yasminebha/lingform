import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';


import { updateBuilder } from '@/app/store/actions/builder.actions';
import { BuilderState } from '@/app/store/reducers/builder';

@Component({
  selector: 'app-form-settings',
  templateUrl: './form-settings.component.html',
  styleUrls: ['./form-settings.component.css']
})
export class FormSettingsComponent implements OnInit {
  settings: BuilderState['settings'] = {
    openTime: '',
    closeTime: '',
    acceptResponses: true,
    requireLogin: false,
  };

  constructor(private store: Store<{ builder: BuilderState }>) {}

  ngOnInit(): void {
    // Initialize settings from the store
    this.store.select('builder').subscribe((state) => {
      this.settings = { ...state.settings };
    });
  }

  updateSettings(): void {
    this.store.dispatch(updateBuilder({ settings: this.settings }));
  }
}
