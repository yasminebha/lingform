import { AppState } from '@/app/store/reducers';
import { FormService } from '@/shared/services/form.service';
import { UserService } from '@/shared/services/user.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  userid: string = '';
  forms: any;
  constructor(
    private formService: FormService,
    private userService: UserService,
    private store: Store<AppState>,
    private router: Router
  ) {}

  async ngOnInit(): Promise<void> {
    await this.userService.getUser().then((user) => {
      if (user) this.userid = user.id;
    });

    await this.loadForms();
  
  }
  async loadForms(): Promise<void> {
    this.forms = await this.formService.getFormByUserId(this.userid);
  }

  createForm() {
    this.store
      .select((state) => state.user)
      .subscribe(async (user) => {
        if (user.userId) {
          const formId = await this.formService.newForm(user.userId);
          this.router.navigate(['builder', formId]).then(() => {
            window.location.reload();
          });
        }
      });
  }
  logout(){
    if(this.userid !== null)
    this.userService.logout()
    this.router.navigate(['account/login'])
    
  }
}
