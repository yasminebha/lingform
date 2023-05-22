import supabase from '@/app/supabase';
import { Injectable } from '@angular/core';
import { Form } from '../models/form.model';

@Injectable({
  providedIn: 'root',
})
export class FormService {
  constructor() {}

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
  async newForm(userId: string): Promise<string> {
    const { error, data } = await supabase
      .from('form')
      .insert(new Form(userId))
      .select('form_id')
      .single();

    if (error) {
      throw new Error(error.message);
    }
    return data?.form_id;
  }

  async getFormById(formId: string): Promise<any> {
    const { error, data } = await supabase
      .from('form')
      .select(`*,question(*)`)
      .eq('form_id', formId)
      .single();

    if (error) {
      console.log(error);
    } else {
      return data;
    }
  }
}
