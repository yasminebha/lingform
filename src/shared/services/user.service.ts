import supabase from '@/app/supabase';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor() {}

  async getUser() {
    try {
      const { data, error } = await supabase.auth.getUser();
      if (error) {
        throw new Error(error.message);
      }
      return data?.user || null;
    } catch (error) {
      console.error('Error fetching user:', error);
      return null;
    }
  }

  async isLoggedIn(): Promise<boolean> {
    const user = await this.getUser();
    return !!user;
  }

  async logout() {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        throw new Error(error.message);
      }
    } catch (error) {
      console.error('Error logging out:', error);
    }
  }
}
