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

export const chatStart = (payload: {
  articleId: string
}) => ({
  type: ChatActionTypes.Start,
  payload,
});

export const chatSendMessage = (payload: {
  articleId: string
  message: string
}) => ({
  type: ChatActionTypes.SendMessage,
  payload,
});

export const chatLoadPage = (payload: {
  articleId: string
  articleName: string
}) => ({
  type: ChatActionTypes.LoadPage,
  payload,
});

export const chatExit = (payload: {
  articleId: string
}) => ({
  type: ChatActionTypes.Exit,
  payload,
});
