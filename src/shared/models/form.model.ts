export class Form {
  form_id!: string;
  editor_id!: string;
  title!: string;
  description!: string;
  headingFontSize: string = '16';
  headingFontFamily: string = '16';
  questionFontSize: string = '16';
  questionFontFamily: string = '16';
  color: string = '#000';
  bgColor: string = '#000';
  textFontSize: string = '16';
  textFontFamily: string = '16';

  constructor(args?: Form) {
    if (args) {
      this.editor_id = args.editor_id;
      this.title = args.title;
      this.description = args.description;
      this.headingFontFamily = args.headingFontFamily;
      this.headingFontSize = args.headingFontSize;
      this.questionFontSize = args.questionFontSize;
      this.questionFontFamily = args.questionFontFamily;
      this.color = args.color;
      this.bgColor = args.bgColor;
      this.textFontSize = args.textFontSize;
      this.textFontFamily = args.textFontFamily;
    }
  }
}
