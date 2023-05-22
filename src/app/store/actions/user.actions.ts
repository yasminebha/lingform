
import { createAction, props } from '@ngrx/store';
export const login = createAction(
    'USER/LOGIN',
    props<{isLoggedIn:boolean,userId:string|undefined}>()
  );

  