import supabase from '@/app/supabase';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.css']
})
export class UpdatePasswordComponent implements OnInit {
  isSubmitting: boolean = false;
  redirecting: boolean = false;

  constructor(private route: ActivatedRoute,private router: Router) { }

  ngOnInit(): void {
 
    this.route.queryParams.subscribe(params => {
      if (params['redirected'] === 'true') {
        this.redirecting = true;
      } else {
        this.redirecting = false;
      }
    });
  }

  async resetPassword(f: NgForm): Promise<void> {
    this.isSubmitting = true;
    if (!this.redirecting){

      const { error } = await supabase.auth.resetPasswordForEmail(f.value.emailControl, {
        redirectTo: 'http://localhost:4200/account/update-password?redirected=true', 
      });
      
      if (error) {
        console.log(error);
      } else {
        alert('A link has been sent');
      }
      
      this.isSubmitting = false;
      this.redirecting = false;
    }
    else{
      if(f.value.passwordControl==f.value.confirmPasswordControl){
        const {error} =await supabase.auth.updateUser({ password: f.value.passwordControl })
      if (error) {
        alert(error);

      } else {
        alert('password changed successfully');
        this.router.navigate(['/account/login'])
      }
      }
      else {
        alert ('confirm password is incorrect')
      }
    }
  }
  
}