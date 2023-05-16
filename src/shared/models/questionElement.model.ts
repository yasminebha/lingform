export class QuestionElement<TMeta = Record<string, any>> {
  quest_id!: string;
  form_id!: string;
  type!: string;
  questLabel?: string;
  required: boolean = false;
  quest_meta?: TMeta;

  constructor(args?: QuestionElement<TMeta>) {
    if (args) {
      this.form_id = args.form_id;
      this.type = args.type;
      this.questLabel = args.questLabel;
      this.required = args.required;
      this.quest_meta = args.quest_meta;
    }
  }
}

// type MlutipleChoiceQuestion = { options: { [key: string]: string } };

// type UploadQuestion = { maxFiles: number; imgsMime: [] };

// const mcq = new QuestionElement<MlutipleChoiceQuestion>();

// const uq = new QuestionElement<UploadQuestion>();

// uq.quest_meta?.maxFiles
// uq.quest_meta?.imgsMime
// mcq.quest_meta?.options;
