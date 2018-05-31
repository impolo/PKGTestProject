import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {EmployeesService} from '../../services/employees.service';
import {PgkconfigService} from '../../services/pgkconfig.service';
import {ActivatedRoute} from '@angular/router';
import {LoadingMode, LoadingType, TdDialogService, TdLoadingService, TdMediaService} from '@covalent/core';
import {Employee} from '../../models/employee';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {t} from '@angular/core/src/render3';
import 'rxjs-compat/add/operator/mergeMap';

@Component({
  selector: 'app-userform',
  templateUrl: './userform.component.html',
  styleUrls: ['./userform.component.css']
})
export class UserformComponent implements OnInit {

  action: string;
  employeeId
  employee: Employee;
  userForm: FormGroup;
  positions;
  public phoneNumberMask = ['+', '7', '(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/];

  constructor(private route: ActivatedRoute,
              private ls: TdLoadingService,
              public  auth: AuthService,
              public media: TdMediaService,
              private cdr: ChangeDetectorRef,
              public config: PgkconfigService,
              private es: EmployeesService,
              private formBuilder: FormBuilder,
              private ds: TdDialogService) {
    this.userForm = formBuilder.group({
      'lastName': ['', Validators.required],
      'firstName': ['', Validators.required],
      'position': ['', Validators.required],
      'phone': ['+7', Validators.required]
    });

    ls.create({
      name: 'fullScreen',
      mode: LoadingMode.Indeterminate,
      type: LoadingType.Linear,
      color: 'accent',
    });

    this.route.url.subscribe((url: any) => {
      console.log(url);
      this.action = (url[0].path);
    });

    this.ls.register('fullScreen');
    this.route.params
      .subscribe(data => {
        this.employeeId = data['id']
        if (this.employeeId) {
          this.es.getEmployee(this.employeeId)
            .then(doc => {
              const employee = doc.data()
              this.userForm.controls['lastName'].setValue(employee['lastName']);
              this.userForm.controls['firstName'].setValue(employee['firstName']);
              this.userForm.controls['position'].setValue(employee['position']);
              this.userForm.controls['phone'].setValue(employee['phone']);

              this.ls.resolve('fullScreen');
            })
            .catch(error => {
              this.ls.resolve('fullScreen');
              this.ds.openAlert({
                message: 'Ошибка при получении данных сотрудника',
                closeButton: 'Закрыть'
              });
            });
        } else {
          this.ls.resolve('fullScreen')
        }

      });

  }

  ngOnInit() {
    this.loadPositions();
  }

  goBack(): void {
    window.history.back();
  }

  save() {
    this.ls.register('fullScreen');

    if (!this.employeeId) {
      this.es.addEmployee({
        'lastName': this.userForm.controls['lastName'].value,
        'firstName': this.userForm.controls['firstName'].value,
        'position': this.userForm.controls['position'].value,
        'phone': this.userForm.controls['phone'].value
      }).then(() => {
        this.ls.resolve('fullScreen');
        this.goBack();
      })
        .catch(error => {
          this.ls.resolve('fullScreen');
          this.ds.openAlert({
            message: 'Ошибка при создании сотрудника',
            closeButton: 'Закрыть'
          });
        });
    } else {
      this.es.updateEmployee(this.employeeId, {
        'lastName': this.userForm.controls['lastName'].value,
        'firstName': this.userForm.controls['firstName'].value,
        'position': this.userForm.controls['position'].value,
        'phone': this.userForm.controls['phone'].value
      }).then(() => {
        this.ls.resolve('fullScreen');
        this.goBack();
      })
        .catch(error => {
          this.ls.resolve('fullScreen');
          this.ds.openAlert({
            message: 'Ошибка при обновлении сотрудника',
            closeButton: 'Закрыть'
          });
        });
    }


  }

  loadPositions() {
    this.ls.register('fullScreen');
    this.es.getCollection({path: 'positions', field: 'name'}).subscribe(data => {

        this.positions = (data);
        this.ls.resolve('fullScreen');
      }
      , error => (console.log(error))
    );
  }

}
