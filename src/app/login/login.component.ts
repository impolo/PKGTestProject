import {Component} from '@angular/core';
import {Router} from '@angular/router';

import {LoadingMode, LoadingType, TdDialogService, TdLoadingService} from '@covalent/core';
import {AuthService} from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {

  username: string;
  password: string;

  constructor(private router: Router,
              private ls: TdLoadingService,
              private auth: AuthService,
              private ds: TdDialogService) {
    ls.create({
      name: 'fullScreen',
      mode: LoadingMode.Indeterminate,
      type: LoadingType.Linear,
      color: 'accent',
    });
  }

  login(): void {
    // this._loadingService.register();
    this.ls.register('fullScreen');
    this.auth.login(this.username, this.password)
      .subscribe((user) => {
          this.ls.resolve('fullScreen');
          this.router.navigate(['/users'])
        },
        (error) => {
          this.ls.resolve('fullScreen')
          this.ds.openAlert({
            message: 'Неверное имя пользователя или пароль',
            closeButton: 'Закрыть'
          })

        })
  }
}
