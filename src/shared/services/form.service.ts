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
        form_id: shortid.generate(),
        editeur_id: userId,
        description: '',
        title: 'Untitled Form',
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
  async updateForm(formId: string | null, updatedForm: any): Promise<void> {
    const { error } = await supabase
      .from('form')
      .update(updatedForm)
      .eq('form_id', formId);

    if (error) {
      throw new Error(error.message);
    }
  }

  async submitAnswers(answers: { quest_id: string; value: any }[]) {
    for (const a of answers) {
      await supabase.from('answer').insert({
        data: { value: a.value },
        quest_id: a.quest_id,
      });
    }
  }
  async getAnswersByForm(formId: string):Promise<any> {
    const { error, data } = await supabase
      .from('form')
      .select(`question(questLabel,answer(data,created_at))`).eq('form_id',formId);
      if(!error)
      return data
      else
      throw new Error(error.message)
  }
}
