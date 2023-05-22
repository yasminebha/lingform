import { changeFormId } from '@/app/store/actions/builder.actions';
import { AppState } from '@/app/store/reducers';
import { FormService } from '@/shared/services/form.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { first, take } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(
    private userService: FormService,
    private store: Store<AppState>,
    private router: Router
  ) {}

  ngOnInit(): void {}

  createForm() {
    this.store
      .select((state) => state.user)
      .subscribe(async (user) => {
        if (user.userId) {
          const formId = await this.userService.newForm(user.userId);
          this.router.navigate(['builder', formId]).then(() => {
            window.location.reload();
          });
        }
      });
  }
}
