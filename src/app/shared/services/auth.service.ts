import { Injectable} from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { auth } from 'firebase/app';
import { User } from '@firebase/auth-types';
import { Router } from '@angular/router';
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
