import { UserService } from '@/shared/services/user.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard  {
  constructor(private userService: UserService, private router: Router) {}

  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean | UrlTree> {
    const isLoggedIn = await this.userService.isLoggedIn();
    if (!isLoggedIn) {
      return this.router.createUrlTree(['/account/login']);
    }
    return true;
  }
}
