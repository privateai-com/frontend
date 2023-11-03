import { RequestStatus } from 'types';
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
