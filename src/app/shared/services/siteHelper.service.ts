import { Injectable } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SiteHelperService {
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(map(result => result.matches));
  matSteeperPosition;
  constructor(private breakpointObserver: BreakpointObserver) {
    this.isHandset$.subscribe(isHandset => {
      this.matSteeperPosition = isHandset ? true : false;
    });
  }
}
