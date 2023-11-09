import { RequestActionTypes } from 'store/request/actionsTypes';
import {
  Pagination,
  PartialRecord, RequestArticle, RequestStatus, 
} from 'types';

export interface RequestState {
  myRequests: RequestArticle[],
  requestsToMe: RequestArticle[],
  total: number,
  pagination?: Pagination,
  ui: PartialRecord<RequestActionTypes, RequestStatus>,
}
