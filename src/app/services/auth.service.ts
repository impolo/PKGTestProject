import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {AngularFireAuth} from 'angularfire2/auth';
import {fromPromise} from 'rxjs/observable/fromPromise';
import {User} from '../models/user';
import {isNullOrUndefined} from 'util';
import 'rxjs-compat/add/operator/map';


@Injectable()
export class AuthService implements CanActivate {


  user;

  constructor(private router: Router,
              private firebaseAuth: AngularFireAuth) {
    this.user = this.firebaseAuth.authState;
  }


  login(email: string, password: string) {
    return fromPromise(this.firebaseAuth.auth.signInWithEmailAndPassword(email, password));

  }

  logout() {
    return this.firebaseAuth.auth.signOut();
  }


  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot) {

    return this.firebaseAuth.authState.map(auth => {
      console.log(auth);
      if (isNullOrUndefined(auth)) {
        this.router.navigate(['/login']);
        return false;
      } else {
        return true;
      }
    });

  }

}
