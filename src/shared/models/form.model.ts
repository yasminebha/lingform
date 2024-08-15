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
  textFontFamily: String = 'Roboto';
  created_at :string=''
  updated_at :string=''
  question: QuestionElement[] = [];
  blockOrder:string[]=[]
  submissions_count:number=0;
  coverImage:string=''
  logoImage:string=''
  bgImage:string=''
  constructor(editeurId: string) {
    this.editeur_id = editeurId;
  }
}
