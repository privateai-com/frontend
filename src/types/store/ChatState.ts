import { MessageDirection } from '@chatscope/chat-ui-kit-react/src/types/unions';
import { ChatActionTypes } from 'store/chat/actionTypes';
import {
  PartialRecord,
  RequestStatus,
} from 'types';

export interface ChatState {
  messages: MessageChat[];
  ui: PartialRecord<ChatActionTypes, RequestStatus>;
}

export interface MessageChat {
  message: string,
  sender: string,
  position: 'single' | 'first' | 'normal' | 'last' | 0 | 1 | 2 | 3;
  direction: MessageDirection,
}

export interface ChatInfo {
  message: string;
  id: number;
}

export enum SocketChatEvent {
  NEW_CHAT = 'newChat',
  SERVER_ERROR = 'ServerError',
}

export type EmitedSocketChatEvent = {
  event: SocketChatEvent;
  data: [ChatInfo[], number];
};
