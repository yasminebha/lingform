import { AppState } from '@/app/store/reducers';
import supabase from '@/app/supabase';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

@Component({
  selector: 'lg-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isSubmitting: boolean = false;
  errorMsg:string=""
  invalidControl:boolean=false;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  async login(f: NgForm): Promise<void> {
    this.isSubmitting = true;
    const {
      error,
    } = await supabase.auth.signInWithPassword({
      email: f.value['emailControl'],
      password: f.value['passwordControl'],
    });
    this.isSubmitting = false;
    if (error){
      this.errorMsg=error.message
      this.invalidControl= true;
    }
    else {
     
      this.router.navigate(['/forms']).then(()=>{
        window.location.reload();
      })
   
    }
  }

}
