
import { createAction, props } from '@ngrx/store';
import { UserState } from '../reducers/user';
export const login = createAction(
    'USER/LOGIN',
    props<{isLoggedIn:boolean,userId:string|undefined,firstName:string,lastName:string,avatar:string,email:string}>()
  );

  export const updateUser = createAction(
    'USER/UPDATE_USER',
    props<Partial<UserState>>()
  );