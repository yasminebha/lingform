import supabase from '@/app/supabase';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }
  async getUser() {
    const {
      error,
      data: { user },
    } = await supabase.auth.getUser();
    if (user) {
      console.log(user);
      return user;
    }
    console.log(error);

    return null;
  }
}
