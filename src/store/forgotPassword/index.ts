import { createReducer } from 'utils';
import { ForgotPasswordState } from 'types/store/ForgotPassword';
import { forgotPasswordHandlers } from './handlers';

export const forgotPasswordInitialState: Readonly<ForgotPasswordState> = {
  email: undefined,
  password: undefined,
  verificationCode: undefined,
};

export default createReducer(forgotPasswordInitialState, forgotPasswordHandlers);
