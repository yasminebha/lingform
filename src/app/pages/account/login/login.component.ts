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

  constructor(private router: Router,private store:Store<AppState>) { }

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
      alert(error.message)
    }
    else {
     
      this.router.navigate(['/forms'])
    }
  }

}
