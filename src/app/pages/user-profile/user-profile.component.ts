import { updateUser } from '@/app/store/actions/user.actions';
import { AppState } from '@/app/store/reducers';
import { UserState } from '@/app/store/reducers/user';
import supabase from '@/app/supabase';
import { FormService } from '@/shared/services/form.service';
import { UserService } from '@/shared/services/user.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';

@Component({
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent implements OnInit {

  errorMsg:string=""
  invalidControl:boolean=false;
  isSubmitting: boolean = false;
  user!:UserState;
bgImgUrl: any;
  avatarUrl: string='';
  emailSent:boolean=false
  constructor(private store:Store<AppState>,private formService:FormService,private userService:UserService){

  }
  ngOnInit(): void {
    this.store.select(state => state.user).subscribe(userState => {
      this.user = userState;
      this.avatarUrl=userState.avatar
    });

    
  }
  async uploadAvatar(f:File){
    if(f){
      const path = await this.formService.uploadFile(f, `user_${this.user.userId}/avatar/${f.name}`);
      const publicUrl = await this.formService.getPublicUrl(path);
      this.store.dispatch(updateUser({ avatar:publicUrl}));
      
    }
    
    
  }
 async removeAvatar(){
    let fileName = '';
    const parts = this.avatarUrl.split('/');
    fileName = parts[parts.length - 1]; 
    await this.formService.deleteFilesInBucket('uploads', `user_${this.user.userId}/avatar/${fileName}`)
    this.avatarUrl=''
    this.store.dispatch(updateUser({ avatar:this.avatarUrl}));

  }
  updateProfile(f: NgForm) {
   
  if(f.value['firstName'] ){
    this.userService.updateUser({
      first_name:f.value['firstName']
    })
    if(f.value['lastName']){
      this.userService.updateUser({
      last_name:f.value['lastName']
      })
    }
    alert('user updated successfuly')

  }

  
  }

  async resetPassword(): Promise<void> {
    

      const { error } = await supabase.auth.resetPasswordForEmail(this.user.email, {
        redirectTo: 'http://localhost:4200/account/update-password?redirected=true', 
      });
      
      if (error) {
        console.log(error);
      } else {
        alert('A reset link has been sent to your inbox');
        this.emailSent=true
      }
      
    }
   
}
