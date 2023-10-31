import { createReducer, on } from '@ngrx/store';
import * as userActions from '../actions/user.actions';

export interface UserState {
  isLoggedIn:boolean;
  userId:string|undefined;
  username:string
}

const initialState: UserState = {
    isLoggedIn:false,
    userId:'',
    username:''
};

export const userReducer = createReducer(
  initialState,
  on(
    userActions.login,
    (currentState, {isLoggedIn,userId,username}) => ({
      ...currentState,
      isLoggedIn: isLoggedIn,
      userId:userId,
      username:username
    })
  )
 
);
