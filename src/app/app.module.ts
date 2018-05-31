import {BrowserModule, Title} from '@angular/platform-browser';
import {NgModule} from '@angular/core';


import {AppComponent} from './app.component';
import {
  CovalentCommonModule, CovalentDataTableModule,
  CovalentDialogsModule,
  CovalentLayoutModule,
  CovalentLoadingModule,
  CovalentMediaModule, CovalentPagingModule, CovalentSearchModule,
  CovalentStepsModule
} from '@covalent/core';
import {UsersComponent} from './users/users.component';
import {AuthService} from './services/auth.service';
import {environment} from '../environments/environment';
import {AngularFirestoreModule} from 'angularfire2/firestore';
import {AngularFireModule} from 'angularfire2';
import {AngularFireAuthModule} from 'angularfire2/auth';
import {LoginComponent} from './login/login.component';
import {MainComponent} from './main/main.component';
import {RouterModule} from '@angular/router';
import {appRoutes, appRoutingProviders} from './app.routes';
import {NoaccessComponent} from './noaccess/noaccess.component';
import {
  MatButtonModule,
  MatCardModule,
  MatDividerModule,
  MatIconModule,
  MatInputModule,
  MatListModule, MatSelectModule,
  MatToolbarModule
} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {PgkconfigService} from './services/pgkconfig.service';
import {EmployeesService} from './services/employees.service';
import { UserformComponent } from './users/userform/userform.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {InputMaskModule} from 'primeng/primeng';
import {NgxMaskModule} from 'ngx-mask';
import {TextMaskModule} from 'angular2-text-mask';


@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    LoginComponent,
    MainComponent,
    NoaccessComponent,
    UserformComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    // material modules
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatListModule,
    MatDividerModule,
    MatInputModule,
    MatToolbarModule,
    MatSelectModule,
    TextMaskModule,
    // covalent modules
    CovalentCommonModule,
    CovalentLayoutModule,
    CovalentMediaModule,
    CovalentLoadingModule,
    CovalentDialogsModule,
    CovalentSearchModule,
    CovalentDataTableModule,
    CovalentPagingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features
    appRoutes
  ],
  providers: [AuthService,
    appRoutingProviders,
    Title,
    PgkconfigService,
    EmployeesService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
