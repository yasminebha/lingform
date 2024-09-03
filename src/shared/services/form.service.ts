import supabase from '@/app/supabase';
import { Injectable } from '@angular/core';
import * as shortid from 'shortid';
import { BehaviorSubject } from 'rxjs';
import { debounce } from '../utils/timing';
import { QuestionElement } from '../models/questionElement.model';
import { QuestionService } from './question.service';

@Injectable({
  providedIn: 'root',
})
export class FormService {
  constructor(private questService:QuestionService) {}
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
    const { data, error } = await supabase.storage
      .from('uploads')
      .upload(path, file);
    if (error) throw new Error(error.message);
    return data.path;
  }
  
  async getPublicUrl(path: string): Promise<string> {
    
    const { data } =supabase.storage.from('uploads').getPublicUrl(path);
    return data.publicUrl;
  }
  async deleteFilesInBucket(bucketName: string, path: string): Promise<void> {
    const { error } = await supabase
      .storage
      .from(bucketName)
      .remove([path]);
  
    if (error) throw new Error(error.message);
  }
  
  async submitAnswers(
    answers: { quest_id: string; value: any }[],
    submissionId: string
  ): Promise<void> {
    for (const a of answers) {
      await supabase.from('answer').insert({
        data: { value: a.value },
        quest_id: a.quest_id,
        submission_id: submissionId,
      });
    }
  }
  async addSubmission(formId: string): Promise<string> {
    const { data, error } = await supabase
      .from('submission')
      .insert({
        submission_id: shortid.generate(),
        form_id: formId,
      })
      .select('submission_id')
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return data.submission_id;
  }

  async getAllSubmission(formId: string): Promise<any> {
    const { error: submissionError, data } = await supabase
      .from('submission')
      .select('*')
      .eq('form_id', formId);

    if (submissionError) {
      throw new Error(`Error fetching submissions: ${submissionError.message}`);
    } else return data;
  }

  async getSubmissionDetails(formId: string): Promise<any> {
    const { error, data } = await supabase.rpc('get_submission_details', {
      form_id_param: formId,
    });
    if (error) {
      console.log(error);
      throw error;
    } else return data;
  }

  async getFormByUserId(userId: string): Promise<any> {
    if (userId) {
      const { data, error } = await supabase.rpc('get_forms_by_user', { user_id: userId });
  
      if (!error) return data;
      else throw new Error(error.message);
    }
  }
  
  async deleteForm(formId: string): Promise<void> {
    const { error } = await supabase.rpc('delete_single_form', { p_form_id: formId });
  
    if (error) {
      console.error('Error deleting the form', error.message);
      throw error;
    }
  }
  
  
  async getBlockOrder(formId: string): Promise<string[]> {
    const { data, error } = await supabase
      .from('form')
      .select('blockOrder')
      .eq('form_id', 'formId')
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
  async deleteMultipleForms(formIds: string[]): Promise<void> {
    const { error } = await supabase.rpc('delete_multiple_forms', {
      form_ids: formIds,
    });
    if (error) {
      console.log(error);
      throw error;
    }
  }



  public autoSave = debounce(async (builderState: any) => {
    this.setIsSaving(true);

    const updatedForm = {
      title: builderState.title,
      description: builderState.description,
      blockOrder: builderState.blockOrder,
      bgColor: builderState.backgroundColor,
      updated_at: new Date(),
      coverImage: builderState.coverImage,
      logoImage: builderState.logoImage,
      bgImage: builderState.bgImage,
      settings: builderState.settings,
    };

    Object.values(builderState.blocks).forEach((block: any) => {
      const newBlock: QuestionElement = {
        quest_id: block.quest_id,
        form_id: block.form_id,
        kind: block.kind || null,
        questLabel: block.questLabel,
        required: block.required || false,
        quest_meta: block.quest_meta || {},
      };
      this.questService.addQuestionBlock(newBlock);
    });

    await this.updateForm(builderState.form_id, updatedForm);
    this.setIsSaving(false);

    console.log('Form auto-saved');
  }, 2000);
}
