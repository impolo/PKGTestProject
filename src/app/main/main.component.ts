import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../services/auth.service';
import {User} from '../models/user';
import {DomSanitizer} from '@angular/platform-browser';
import {PgkconfigService} from '../services/pgkconfig.service';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent {

  routes: Object[] = [{
    title: 'Сотрудники',
    route: '/users',
    icon: 'people',
  }
  ];

  user: User = new User;

  constructor(private router: Router,
              private auth: AuthService,
              public config: PgkconfigService) {

    this.auth.user.subscribe((user) => {
      this.user = user;
      console.log(this.user);
    });
  }

  logout(): void {
    this.auth.logout().then(() => this.router.navigate(['/login']));
  }
}
