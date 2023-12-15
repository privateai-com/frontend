import createReducer from 'utils/createReducer';
import { RequestStatus } from 'types';
import { RequestState } from 'types/store/RequestState';
import { RequestActionTypes } from './actionsTypes';
import { requestHandlers } from './handlers';

export const requestInitialState: Readonly<RequestState> = {
  myRequests: [],
  requestsToMe: [],
  total: 0,
  ui: {
    [RequestActionTypes.GetData]: RequestStatus.INIT,
    [RequestActionTypes.Create]: RequestStatus.INIT,
    [RequestActionTypes.Delete]: RequestStatus.INIT,
    [RequestActionTypes.GetMyRequests]: RequestStatus.INIT,
    [RequestActionTypes.GetRequestsToMe]: RequestStatus.INIT,
  },
};

export default createReducer(requestInitialState, requestHandlers);
