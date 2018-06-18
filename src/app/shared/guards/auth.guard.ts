import { CanLoad, Router, Route } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';

@Injectable()
export class AuthGuard implements CanLoad {
  constructor(
    private auth: AuthService,
    private router: Router
  ) {}
  canLoad(route: Route): Observable<boolean> {
    return this.auth.afAuth.authState.pipe(
      take(1),
      map((authState) => !!authState),
      tap(authenticated => {
        if (!authenticated) this.router.navigate(['/'])
      })
    )
}
}
