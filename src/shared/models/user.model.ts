export class User {
   
    email!: string;
    password!:string;
    first_name?:string;
    last_name?:string;
    avatar?: string;
    
    constructor(args: User) {

    this.email = args.email;
    this.first_name = args.first_name;
    this.last_name = args.last_name;
    this.avatar = args.avatar;
    this.password = args.password;
    }
   
}
