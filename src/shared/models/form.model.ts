import * as shortid from "shortid"
export class Form {
    form_id:string
    editor_id:string
    title!:string
    description!:string
    headingFontSize: string
    headingFontFamily:string
    questionFontSize:string
    questionFontFamily:string
    color:string
    bgColor:string
    textFontSize:string
    textFontFamily:string

    constructor(args :Form){
        this.form_id=shortid.generate()
        this.editor_id=args.editor_id
        this.title=args.title
        this.description=args.description
        this.headingFontFamily=args.headingFontFamily
        this.headingFontSize=args.headingFontSize
        this.questionFontSize=args.questionFontSize
        this.questionFontFamily=args.questionFontFamily
        this.color=args.color
        this.bgColor=args.bgColor
        this.textFontSize=args.textFontSize
        this.textFontFamily=args.textFontFamily
    }
}