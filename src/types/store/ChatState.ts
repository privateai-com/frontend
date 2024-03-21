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
  id: number;
  message: string,
  sender: string,
  position: 'single' | 'first' | 'normal' | 'last' | 0 | 1 | 2 | 3;
  direction: MessageDirection,
}

export interface UserChatInfo {
  id: number;
  fullName: string;
  username: string;
}

export interface ChatInfo {
  createdAt: string;
  message: string;
  id: number;
  status: 'delivered';
  writer?: UserChatInfo;
}

export interface ChatInfoMessage {
  id: number;
  chatId: number;
  messages: ChatInfo[];
}

export enum SocketChatEvent {
  Start = 'chat:start',
  NewMessage = 'chat:new-message',
  MessageWriting = 'chat:message-writing',
  LoadPage = 'chat:load-page',
  Exit = 'chat:exit',
}

export type EmitedSocketChatEvent = {
  event: SocketChatEvent;
  data: {
    data: ChatInfo[] | ChatInfoMessage;
  }
};
