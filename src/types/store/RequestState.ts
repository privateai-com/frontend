import { RequestActionTypes } from 'store/request/actionsTypes';
import {
  PartialRecord, RequestStatus, 
} from 'types';

export interface RequestState {
  ui: PartialRecord<RequestActionTypes, RequestStatus>,
}
