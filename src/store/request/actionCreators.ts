import { RequestStatus, SortingDirection } from 'types';
import { RequestState } from 'types/store/RequestState';
import { RequestActionTypes } from './actionsTypes';

export const requestSetState = (payload: Partial<RequestState>) => ({
  type: RequestActionTypes.SetState,
  payload,
});

export const requestSetStatus = (
  payload: { type: RequestActionTypes, status: RequestStatus },
) => ({
  type: RequestActionTypes.SetStatus,
  payload,
});

export const requestGetData = () => ({
  type: RequestActionTypes.GetData,
});

export const requestCreate = (payload: {
  articleId: number,
  callback?: () => void,
}) => ({
  type: RequestActionTypes.Create,
  payload,
});

export const requestAnswer = (payload: {
  requestId: number,
  isApprove: boolean,
  callback?: () => void,
}) => ({
  type: RequestActionTypes.Answer,
  payload,
});

export const requestDelete = (payload: {
  requestId: number,
  callback?: () => void,
}) => ({
  type: RequestActionTypes.Delete,
  payload,
});

export const requestGetMyRequests = (payload: {
  limit: number;
  offset: number;
  sortingField: string;
  sortingDirection: SortingDirection;
}) => ({
  type: RequestActionTypes.GetMyRequests,
  payload,
});

export const requestToMe = (payload: {
  limit: number;
  offset: number;
  sortingField: string;
  sortingDirection: SortingDirection;
}) => ({
  type: RequestActionTypes.GetRequestsToMe,
  payload,
});
