export class Answer<TMeta>{
    answer_id!: number;
    quest_id!: string|null;
    value?:TMeta;
    participant_id?:string;
  
    constructor(args?: Answer<TMeta>) {
      if (args) {
        this.answer_id = args.answer_id;
        this.quest_id = args.quest_id;
        this.value = args.value;
        this.participant_id = args.participant_id;
     
      }
    }
  }