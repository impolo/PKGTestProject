import {AfterViewInit, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {ActivatedRoute, Router} from '@angular/router';
import {
  IPageChangeEvent,
  ITdDataTableColumn,
  ITdDataTableSortChangeEvent,
  LoadingMode, LoadingType, TdDialogService,
  TdLoadingService,
  TdMediaService
} from '@covalent/core';
import {AuthService} from '../services/auth.service';
import {PgkconfigService} from '../services/pgkconfig.service';
import {EmployeesService} from '../services/employees.service';
import {Observable} from 'rxjs/Observable';
import * as firebase from 'firebase';
import OrderByDirection = firebase.firestore.OrderByDirection;
import {Employee} from '../models/employee';

const PAGE_SIGE = 2;

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit, AfterViewInit {


  positions = [];
  currentPage = 1;
  sortField = 'lastName';
  sortOrder: OrderByDirection = 'asc';
  selectedRows: Employee[] = [];
  searchTerm: string;

  columns: ITdDataTableColumn[] = [
    {name: 'lastName', label: 'Фамилия'},
    {name: 'firstName', label: 'Имя'},
    {name: 'position', label: 'Должность'},
    {name: 'phone', label: 'Телефон'}
  ];

  constructor(private route: ActivatedRoute,
              private router: Router,
              private ls: TdLoadingService,
              public  auth: AuthService,
              public media: TdMediaService,
              private cdr: ChangeDetectorRef,
              public config: PgkconfigService,
              private es: EmployeesService,
              private ds: TdDialogService) {
    ls.create({
      name: 'fullScreen',
      mode: LoadingMode.Indeterminate,
      type: LoadingType.Linear,
      color: 'accent',
    });
  }

  ngOnInit() {

  }

  editRow(event: any) {
    let row = event.row;
    this.router.navigate(['users/edit', row['id']]);
  }

  ngAfterViewInit(): void {
    // broadcast to all listener observables when loading the page
    this.media.broadcast();
    //


    this.loadEmployees();
    this.cdr.detectChanges();
  }

  delete() {
    console.log(this.selectedRows);

    if (this.selectedRows && this.selectedRows.length > 0) {
      this.ds.openConfirm({
        message: this.selectedRows.map(position => position.lastName + ' ' + position.firstName).join(', ').substring(0, 100),
        title: 'Вы уверены, что хотите удалить данных сотрудников?', //OPTIONAL, hides if not provided
        cancelButton: 'Отмена', //OPTIONAL, defaults to 'CANCEL'
        acceptButton: 'Выполнить', //OPTIONAL, defaults to 'ACCEPT'
        width: '500px', //OPTIONAL, defaults to 400px
      }).afterClosed().subscribe((accept: boolean) => {
        if (accept) {
          // DO SOMETHING
          this.selectedRows
            .map(employee => employee['id'])
            .forEach(id => {
              this.es.deleteEmployee(id)
                .then(() => {
                })
                .catch(error => this.ds.openAlert({
                  message: 'Ошибка при удалении сотрудника',
                  closeButton: 'Закрыть'
                }));

            });

        } else {
          // DO SOMETHING ELSE
        }
      });
    }


  }

  sort(sortEvent: ITdDataTableSortChangeEvent): void {
    this.sortField = sortEvent.name;
    //console.log(sortEvent.order)
    this.sortOrder = sortEvent.order.toString() === 'ASC' ? 'asc' : 'desc';
    this.loadEmployees();
  }

  page(pagingEvent: IPageChangeEvent): void {
    // this.fromRow = pagingEvent.fromRow;
    this.currentPage = pagingEvent.page - 1;

    this.loadEmployees();
  }

  loadEmployees() {
    this.ls.register('fullScreen');
    this.es.getCollection({path: 'employees', field: this.sortField, limit: PAGE_SIGE, order: this.sortOrder}).subscribe(data => {
        console.log(data);
        this.positions = (data);
        this.ls.resolve('fullScreen');
      }
      , error => (console.log(error))
    );
  }

  search(searchTerm: string): void {
    this.searchTerm = searchTerm;
    this.loadEmployees();
  }

}
