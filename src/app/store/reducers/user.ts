import { createReducer, on } from '@ngrx/store';
import * as userActions from '../actions/user.actions';

export interface UserState {
  isLoggedIn:boolean;
  userId:string|undefined;
}

const initialState: UserState = {
    isLoggedIn:false,
    userId:''
};

export const userReducer = createReducer(
  initialState,
  on(
    userActions.login,
    (currentState, {isLoggedIn,userId}) => ({
      ...currentState,
      isLoggedIn: isLoggedIn,
      userId:userId
    })
  )
 
);
