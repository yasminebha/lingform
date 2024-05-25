import * as shortid from 'shortid';
import { QuestionElement } from './questionElement.model';

export class Form {
  form_id: string = shortid.generate();
  editeur_id!: string;
  title: string = 'Untitled form';
  color: string = '#FFFFF';
  bgColor: string = '#FFFFF';
  description: string='';
  headingFontSize: string = '18';
  headingFontFamily: string = 'Roboto';
  questionFontSize: string = '9';
  questionFontFamily: string = 'Roboto';
  textFontSize: string = '12';
  textFontFamily: string = 'Roboto';
  question: QuestionElement[] = [];
  blockOrder:string[]=[]
  constructor(editeurId: string) {
    this.editeur_id = editeurId;
  }
}
