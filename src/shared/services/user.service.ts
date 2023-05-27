import supabase from '@/app/supabase';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor() {}
  async getUser() {
    const {
      error,
      data: { user },
    } = await supabase.auth.getUser();
    if (user) {
      return user;
    }
    console.log(error);

    return null;
  }
  isLoggedIn(): boolean {
    if (this.getUser() !== null) return true;
    return false;
  }
  logout(){
    
  }
}
