import createReducer from 'utils/createReducer';
import { RequestStatus } from 'types';
import { RequestState } from 'types/store/RequestState';
import { RequestActionTypes } from './actionsTypes';
import { requestHandlers } from './handlers';

export const requestInitialState: Readonly<RequestState> = {
  ui: {
    [RequestActionTypes.GetData]: RequestStatus.INIT,
  },
};

export default createReducer(requestInitialState, requestHandlers);
