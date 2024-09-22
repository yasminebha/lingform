import { Component } from '@angular/core';
import { AppState } from './store/reducers';
import { Store } from '@ngrx/store';
import { login } from './store/actions/user.actions';
import { UserService } from '@/shared/services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'lingform';
  public isLoggedIn: boolean = false;
  public userId: string | undefined = '';
  constructor(
    private userService: UserService,
    private store: Store<AppState>
  ) {}
  ngOnInit() {
    this.userService
      .getUser()
      .then((user) => {
        if (user) {
          this.store.dispatch(
            login({ 
              isLoggedIn: true,
              userId: user.id,
              firstName:user.user_metadata['first_name'],
              lastName:user.user_metadata['last_name'],
              avatar:user.user_metadata['avatar_url'],
              email:user.user_metadata['email']
            })
          );
        }
      })
      .catch((e) => {
        console.log(e);
      });
      // console.log(this.userService.getUser());
  }
  
}
