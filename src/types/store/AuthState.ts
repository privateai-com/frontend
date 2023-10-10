import { authErrorWords } from 'appConstants';
import { AuthActionTypes } from 'store/auth/actionTypes';
import {
  AccountState,
  PartialRecord,
  RequestStatus,
} from 'types';

export interface AuthState {
  accessToken?: string;
  refreshToken?: string;
  timestamp?: number;
  email?: string;
  verificationCode?: string;

  ui: PartialRecord<AuthActionTypes, RequestStatus>;
}

type FieldKey = typeof authErrorWords[number];

export type AuthErrorTransformResult = {
  message: string;
  fields: { [key in FieldKey]?: string };
};

export type UpdatePayload = {
  isSuccessfull: boolean;
  errorMessage?: string;
};

export interface RefreshAccessTokensData {
  accessToken: string;
  refreshToken: string;
  timestamp: number;
}

export interface UserResponse {
  data: {
    user: AccountState;
  } & RefreshAccessTokensData;
}
