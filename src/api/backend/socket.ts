/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  select,
} from 'redux-saga/effects';
import { io, SocketOptions } from 'socket.io-client';

import { authSelectors } from 'store/auth/selectors';

const baseURL = process.env.NEXT_PUBLIC_API_URL as string;

export function* socketConnect(path?: string) {
  const accessToken: string | undefined = yield select(authSelectors.getProp('accessToken'));
  const socketOptions: Partial<SocketOptions> | Record<string, any> = {
    path,
    transportOptions: {
      polling: {
        extraHeaders: {
          'Content-Type': 'application/json',
        },
      },
    },
  };

  if (accessToken) {
    socketOptions.transportOptions.polling.extraHeaders.Authorization = `Bearer ${accessToken}`;
  }
  
  return io(`${baseURL}`, socketOptions);
}
