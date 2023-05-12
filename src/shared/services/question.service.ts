import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import supabase from '../../app/supabase';
import { QuestionElement } from '../models/questionElement.model';
@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor() { }
  async addNewQuestionElement(element:QuestionElement):Promise<void>{
    const {error} = await supabase.from("question").insert({
      type:element.type,
      questLabel:element.questLabel,
      required:element.required,
      quest_meta:element.quest_meta
    })
    if(error){
      throw error
    }

  }
}
