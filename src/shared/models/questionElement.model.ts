import * as shortid from "shortid"

export type option={key:string,value:string}

export class QuestionElement {
    quest_id?:string
    form_id?:string
    type?:string
    questLabel?:string
    required?:boolean
    quest_meta?:{options?:option[]}
   
    constructor(args :QuestionElement){
        this.quest_id=shortid.generate()
        this.form_id=args.form_id
        this.type=args.type
        this.questLabel=args.questLabel
        this.required=args.required
        this.quest_meta=args.quest_meta
        
    }
}