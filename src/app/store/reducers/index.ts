import { isDevMode } from '@angular/core';
import { ActionReducer, ActionReducerMap, MetaReducer } from '@ngrx/store';
import { builderReducer, BuilderState } from './builder';
import { UserState, userReducer } from './user';

export interface AppState {
  builder: BuilderState;
  user: UserState;
}

export function debug(reducer: ActionReducer<any>): ActionReducer<any> {
  return function (state, action) {
    console.log('state', state);
    console.log('action', action);

    return reducer(state, action);
  };
}

export const reducers: ActionReducerMap<AppState> = {
  builder: builderReducer,
  user: userReducer,
};

export const metaReducers: MetaReducer<AppState>[] = isDevMode() ? [debug] : [];
