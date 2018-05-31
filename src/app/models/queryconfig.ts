import * as firebase from 'firebase';
import OrderByDirection = firebase.firestore.OrderByDirection;

export interface QueryConfig {
  path: string
  field: string
  limit?: number
  order?: OrderByDirection
  prepend?: boolean
}
