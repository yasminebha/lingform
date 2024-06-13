import supabase from '@/app/supabase';
import { Injectable } from '@angular/core';
import * as shortid from 'shortid';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FormService {
  constructor() {}
  private isSavingSubject = new BehaviorSubject<boolean>(false);
  isSaving$ = this.isSavingSubject.asObservable();
  setIsSaving(value: boolean) {
    this.isSavingSubject.next(value);
  }
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
  async uploadFile(file: File, path: string): Promise<string> {
    const { data, error } = await supabase.storage.from('uploads/files').upload(path, file);
    if (error) throw new Error(error.message);
    return data.path;
  }
  getPublicUrl(path: string): string {
    const {data } = supabase.storage.from('uploads/files').getPublicUrl(path);
    return data.publicUrl;
  }
  async submitAnswers(answers: { quest_id: string; value: any }[]) {
    for (const a of answers) {
      
        await supabase.from('answer').insert({
          data: { value: a.value },
          quest_id: a.quest_id,
        });
    
      
    }
  }
  async addSubmission(formId:string): Promise<void>{
    const{error}=await supabase
    .from('submission').insert({
      form_id:formId,
      

    })
    if (error) throw new Error(error.message);

  }
  async getAllSubmission(formId:string):Promise<any>{
    const{error,data}=await supabase.from('submission')
    .select(`created_at,
      form_id,
      question (
        quest_id,
        questLabel,
        answer (
          data,
          created_at
        )
      )`)
      .eq('from_id',formId)

      if (error) {
        throw new Error(`Error fetching submissions: ${error.message}`);
      }
    
      return data;
  }
  async getAnswersByForm(formId: string): Promise<any> {
    const { error, data } = await supabase
      .from('form')
      .select(`question(questLabel,answer(data,created_at))`)
      .eq('form_id', formId);
    if (!error) return data;
    else throw new Error(error.message);
  }
  async getFormByUserId(userId: string):Promise<any>{
    if (userId) {
      const { error, data } = await supabase
        .from('form')
        .select('form_id,title,created_at,editeur_id')
        .eq('editeur_id', userId);
        if(!error)return data
        else throw new Error(error.message);
    }
  }
  async deleteForm(formId: string): Promise<void> {
    try {
   
      const questionsData = (await supabase.from('question').select('quest_id').eq('form_id', formId)).data;
      const questionIds = questionsData ? questionsData.map(q => q.quest_id) : [];
  
   
      const answersQuery = supabase.from('answer').delete().in('quest_id', questionIds);
      const { error: answerError } = await answersQuery;
      if (answerError) throw answerError;
  
     
      const questionsQuery = supabase.from('question').delete().eq('form_id', formId);
      const { error: questionError } = await questionsQuery;
      if (questionError) throw questionError;
  
    
      const formQuery = supabase.from('form').delete().eq('form_id', formId);
      const { error: formError } = await formQuery;
      if (formError) throw formError;
  
      console.log('Form and related data deleted successfully');
    } catch (error) {
      console.log(error)
    }
  }
  async getBlockOrder(formId: string): Promise<string[]> {
    const { data, error } = await supabase
      .from('form')
      .select('blockOrder')
      .eq('form_id', "formId")
      .single();

    if (error) {
      console.error('Error fetching block order:', error.message);
      throw error;
    }

    return data ? data.blockOrder : [];
  }

  async updateBlockOrder(formId: string, blockOrder: string[]): Promise<void> {
    const { error } = await supabase
      .from('form')
      .update({ blockOrder: blockOrder })
      .eq('form_id', formId);

    if (error) {
      console.error('Error updating block order:', error.message);
      throw error;
    }
  }
  async deleteMultipleForms(formIds:string[]):Promise<void>{
    const { error } = await supabase.rpc('delete_multiple_forms', { form_ids: formIds });
    if(error){
      console.log(error)
      throw error;
    }
        
    
  }
  

}
