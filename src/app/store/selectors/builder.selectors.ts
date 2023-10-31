import { createSelector } from '@ngrx/store';
import { AppState } from '../reducers';

export const getNextMode = createSelector(
  (state: AppState) => state.builder.mode,
  (mode) => {
    return mode === 'edit' ? 'live' : 'edit';
  }
);
