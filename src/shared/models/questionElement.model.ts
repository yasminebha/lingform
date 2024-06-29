export class QuestionElement<TMeta =any> {
  quest_id!: string;
  form_id!: string|null;
  kind!: string|null;
  questLabel!: string;
  required: boolean = false;
  quest_meta?: TMeta;

  constructor(args?: QuestionElement<TMeta>) {
    if (args) {
      this.quest_id = args.quest_id;
      this.form_id = args.form_id;
      this.kind = args.kind;
      this.questLabel = args.questLabel;
      this.required = args.required;
      this.quest_meta = args.quest_meta;
    }
  }
}

