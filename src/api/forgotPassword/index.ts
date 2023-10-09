import { ApiEndpoint, apiBaseUrl } from 'appConstants';
import axios, { AxiosResponse } from 'axios';
import { ResetPasswordResponse } from './types';

const resetPassword = async (
  email: string,
): Promise<AxiosResponse<ResetPasswordResponse>> =>
  (await axios.post)<ResetPasswordResponse>(
    `${apiBaseUrl}${ApiEndpoint.AuthSendCodeResetPassword}`,
    {
      email,
    },
  );

const confirmEmail = async () => {};

export { resetPassword, confirmEmail };
