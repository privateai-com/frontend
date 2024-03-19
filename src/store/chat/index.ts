import { createReducer } from 'utils';
import { ChatState, RequestStatus } from 'types';
import { ChatActionTypes } from './actionTypes';
import { chatHandlers } from './handlers';

export const chatInitialState: Readonly<ChatState> = {
  messages: [],
  ui: {
    [ChatActionTypes.SendMessage]: RequestStatus.INIT,
    [ChatActionTypes.LoadPage]: RequestStatus.INIT,
    [ChatActionTypes.Start]: RequestStatus.INIT,
    [ChatActionTypes.Exit]: RequestStatus.INIT,
  },
};

export default createReducer(chatInitialState, chatHandlers);
