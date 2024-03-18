import {
  ChatState, RequestStatus,
} from 'types';
import { ChatActionTypes } from './actionTypes';

export const chatSetState = (payload: Partial<ChatState>) => ({
  type: ChatActionTypes.SetState,
  payload,
});

export const chatSetStatus = (payload: {
  type: ChatActionTypes;
  status: RequestStatus;
}) => ({
  type: ChatActionTypes.SetStatus,
  payload,
});

export const chatSendMessage = (payload: {
  message: string
}) => ({
  type: ChatActionTypes.SendMessage,
  payload,
});

export const chatGetMessages = (payload: {
  articleId: string
  articleName: string
}) => ({
  type: ChatActionTypes.GetMessages,
  payload,
});
