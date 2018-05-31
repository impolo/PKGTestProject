import {Routes, RouterModule} from '@angular/router';

import {MainComponent} from './main/main.component';

import {UsersComponent} from './users/users.component';
import {LoginComponent} from './login/login.component';
import {AuthService} from './services/auth.service';
import {NoaccessComponent} from './noaccess/noaccess.component';
import {UserformComponent} from './users/userform/userform.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {
    path: '', component: MainComponent, children: [
      {
        path: 'users',  children: [
          {path: '', component: UsersComponent},
          {path: 'add', component: UserformComponent},
          {path: 'edit/:id', component: UserformComponent},
        ], canActivate: [AuthService]
      },
      {path: 'noaccess', component: NoaccessComponent}
    ]
  },
];

export const appRoutingProviders: any[] = [];

export const appRoutes: any = RouterModule.forRoot(routes, {useHash: true});
