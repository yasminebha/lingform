import supabase from '@/app/supabase';
import { Injectable } from '@angular/core';
import { Form } from '../models/form.model';
import * as shortid from 'shortid';

@Injectable({
  providedIn: 'root',
})
export class FormService {
  constructor() {}

  
  async newForm(userId: string): Promise<string> {
    const { error, data } = await supabase
      .from('form')
      .insert({
        form_id:shortid.generate(),
        editeur_id:userId,
        description:'',
        title:'Untitled Form',

      })
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
