import { Injectable } from '@angular/core';
import supabase from '../../app/supabase';
import { QuestionElement } from '../models/questionElement.model';
import { AppState } from '@/app/store/reducers';
import { Store } from '@ngrx/store';

@Injectable({
  providedIn: 'root',
})
export class QuestionService {
  constructor(private store:Store<AppState>) {}
  async addQuestionBlock(element: QuestionElement): Promise<void> {
    const { error } = await supabase.from('question').upsert({
      form_id: element.form_id,
      quest_id: element.quest_id,
      kind: element.kind,
      questLabel: element.questLabel,
      required: element.required,
      quest_meta: element.quest_meta,
    });
    if (error) {
      console.log(error);
    }
  }
  async getAllQuestionByFormId(formId: string): Promise<any> {
    const { error, data } = await supabase
      .from('question')
      .select('*')
      .eq('form_id', formId)
      .order('created_at', { ascending: true });

    if (error) console.log(error);
    else {
      return data;
    }
  }

  
}
