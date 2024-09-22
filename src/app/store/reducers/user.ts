import { createReducer, on } from '@ngrx/store';
import * as userActions from '../actions/user.actions';

export interface UserState {
  isLoggedIn:boolean;
  userId:string|undefined;
  firstName:string,
  lastName:string,
  avatar:string,
  email:string
}

const initialState: UserState = {
    isLoggedIn:false,
    userId:'',
    firstName:'',
      lastName:'',
      avatar:'',
      email:''
};

export const userReducer = createReducer(
  initialState,
  on(
    userActions.login,
    (currentState, {isLoggedIn,userId,firstName,lastName,avatar,email}) => ({
      ...currentState,
      isLoggedIn: isLoggedIn,
      userId:userId,
      firstName:firstName,
      lastName:lastName,
      avatar:avatar,
      email:email
    })
  ),
  on(userActions.updateUser, (currentState, newState) => ({
    ...currentState,
    ...newState,
  })),
 
);
