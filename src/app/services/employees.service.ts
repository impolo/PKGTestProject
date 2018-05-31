import {Injectable} from '@angular/core';
import {Position} from '../models/position';
import {AngularFirestore, AngularFirestoreCollection} from 'angularfire2/firestore';
import {Observable} from 'rxjs/Observable';
import {BehaviorSubject} from 'rxjs/index';
import 'rxjs-compat/add/operator/scan';
import {QueryConfig} from '../models/queryconfig';
import {map} from 'rxjs-compat/operator/map';


const LIMIT = 2;

@Injectable()
export class EmployeesService {

  private _done = new BehaviorSubject(false);
  private _loading = new BehaviorSubject(false);
  private _data = new BehaviorSubject([]);

  private query: QueryConfig;

  data: Observable<any>;
  done = this._done.asObservable();
  loading = this._loading.asObservable();

  positionCollection: AngularFirestoreCollection<Position>;
  items: Observable<Position[]>;

  constructor(private afs: AngularFirestore) {
    //this.positionCollection = afs.collection<Position>('positions')
  }


  init(path, field, opts?) {
    this.query = {
      path,
      field,
      limit: LIMIT,
      reverse: false,
      prepend: false,
      ...opts
    };

  }

  addEmployee(employee) {
    return this.afs.collection('employees').add(employee);
  }

  updateEmployee(id, employee) {
    return this.afs.collection('employees').doc(id).update(employee);
  }

  deleteEmployee(id) {
    return this.afs.collection('employees').doc(id).delete()
  }

  // fillPositions() {
  //   this.positionCollection.add({name: 'Разработчик'});
  //   this.positionCollection.add({name: 'Аналитик'});
  //   this.positionCollection.add({name: 'Тестировщик'});
  //   this.positionCollection.add({name: 'Кладовщик'});
  // }

  getCollection(query: QueryConfig) {
    return this.afs.collection(query.path, ref => {
      return ref.orderBy(query.field, query.order);
      //   .limit(query.limit)
    }).snapshotChanges().map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        return {id, ...data};
      });
    });

  }


  getEmployee(id) {
    console.log(id);
    return this.afs.collection('employees').doc(id).ref.get();
  }


}
