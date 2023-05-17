import { isDevMode } from '@angular/core';
import { ActionReducer, ActionReducerMap, MetaReducer } from '@ngrx/store';
import { builderReducer, BuilderState } from './builder';

export interface AppState {
  builder: BuilderState;
}

export function debug(reducer: ActionReducer<any>): ActionReducer<any> {
  return function (state, action) {
    console.log('state', state);
    console.log('action', action);

    return reducer(state, action);
  };
}

export const reducers: ActionReducerMap<AppState> = { builder: builderReducer };

export const metaReducers: MetaReducer<AppState>[] = isDevMode() ? [debug] : [];
