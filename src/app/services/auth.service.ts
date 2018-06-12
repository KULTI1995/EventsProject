import { Injectable, AfterContentInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { auth } from 'firebase/app';
import { FacebookAuthProvider, User } from '@firebase/auth-types';
import { Router } from '@angular/router';
import { EventService } from './event.service';
import { LocationService } from './location.service';

@Injectable()
export class AuthService {
  user: User = null;
  constructor(
    public afAuth: AngularFireAuth,
    private router: Router,
    private locationservice: LocationService
  ) {
    this.afAuth.auth.onAuthStateChanged(user => {
      this.user = user;
    });
  }

  loginViaFacebook() {
    this.afAuth.auth.signInWithPopup(new auth.FacebookAuthProvider());
    console.log(this.locationservice.myLocation());
  }

  logout() {
    this.afAuth.auth.signOut();
    this.router.navigate(['/']);
  }
}
