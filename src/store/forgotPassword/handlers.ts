import { ActionFn } from 'types';
import { ForgotPasswordState } from 'types/store/ForgotPassword';
import {
  forgotPasswordSetEmail,
  forgotPasswordSetPassword,
  forgotPasswordSetVerificationCode,
} from './actionCreators';
import { ForgotPasswordActionTypes } from './actionTypes';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ForgotPasswordStateActionFn<F extends (...args: any) => any> = ActionFn<
ForgotPasswordState,
ReturnType<F>
>;

const setEmail: ForgotPasswordStateActionFn<typeof forgotPasswordSetEmail> = (
  state,
  { payload },
) => ({
  ...state,
  ...payload,
});

const setVerificationCode: ForgotPasswordStateActionFn<
  typeof forgotPasswordSetVerificationCode
> = (state, { payload }) => ({
  ...state,
  ...payload,
});

const setPassword: ForgotPasswordStateActionFn<
  typeof forgotPasswordSetPassword
> = (state, { payload }) => ({
  ...state,
  ...payload,
});

export const forgotPasswordHandlers = {
  [ForgotPasswordActionTypes.SetEmail]: setEmail,
  [ForgotPasswordActionTypes.SetVerificationCode]: setVerificationCode,
  [ForgotPasswordActionTypes.SetPassword]: setPassword,
};
