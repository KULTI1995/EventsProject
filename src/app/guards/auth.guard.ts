import { CanLoad, Router, Route } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthGuard implements CanLoad {
  constructor(
    private auth: AuthService,
    private router: Router,
  ) {}
  canLoad(route: Route): boolean {
    if (!this.auth.user) {
      // this.router.navigate(['/auth'], { queryParams: { path: route.path}});
      return false;
    }
    return true;
  }
}
