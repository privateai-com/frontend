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

const confirmEmail = async (email: string, password: string, code: string) =>
  axios.post(`${apiBaseUrl}${ApiEndpoint.AuthConfirmResetPassword}`, {
    email,
    password,
    verificationCode: code,
  });

export { resetPassword, confirmEmail };
