import { updateBuilder } from '@/app/store/actions/builder.actions';
import { AppState } from '@/app/store/reducers';
import { Form } from '@/shared/models/form.model';
import { FormService } from '@/shared/services/form.service';
import { UserService } from '@/shared/services/user.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css'],
})
export class ViewComponent implements OnInit {
  mode: 'live' | 'edit' = 'live';
  shouldDisplayForm$!: boolean;
  settings: any;
  requiresLogin: boolean = false;
  isLoggedIn: boolean = false;
  showModal: boolean = false; 
  form!: Form;
  storeSubscription = new Subscription();

  constructor(
    private store: Store<AppState>,
    private route: ActivatedRoute,
    private fs: FormService,
    private userService: UserService,
    private router: Router
  ) {}

  async ngOnInit(): Promise<void> {
    const formId = this.route.snapshot.paramMap.get('id');

    if (formId) {
      this.form = await this.fs.getFormById(formId);
      if (this.form) {
        this.settings = this.form.settings;
        this.requiresLogin = this.settings.requireLogin;
      }
    }

    this.isLoggedIn = await this.userService.isLoggedIn(); 

    if (this.requiresLogin && !this.isLoggedIn) {
      this.showModal = true;
    }

    this.store.dispatch(updateBuilder({ mode: this.mode }));
    this.shouldDisplayForm(this.settings);
  }

  private shouldDisplayForm(settings: any): void {
    const currentTime = new Date();
    const openTime = new Date(settings.openTime);
    const closeTime = new Date(settings.closeTime);
    this.shouldDisplayForm$ =
      settings.acceptResponses &&
      currentTime >= openTime &&
      currentTime <= closeTime;
  }

  redirectToLogin() {
    this.router.navigate(['/account/login']);
  }
}
