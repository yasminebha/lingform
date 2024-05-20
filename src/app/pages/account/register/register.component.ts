
import supabase from '@/app/supabase';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'lg-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  isSubmitting: boolean = false;
  errorMsg:string=""
  invalidControl:boolean=false;
  ngOnInit(): void {}
constructor(private router: Router){

}
  onSubmit(f: NgForm) {
    console.log(f.value);
  }

  async register(f: NgForm): Promise<void> {
    this.isSubmitting = true;
    const {
      error,
    } = await supabase.auth.signUp({
      email: f.value['emailControl'],
      password: f.value['passwordControl'],
      options: {
        data: {
          first_name: f.value['firstNameControl'],
          last_name: f.value['lastNameControl'],
        },
      },
    });
    this.isSubmitting = false;
    if (error){
      this.errorMsg=error.message
      this.invalidControl= true;
     
    } 
    else {
      alert('user added succesfully');
      this.router.navigate(['/account/login'])
    }
  }
}
