import { ApiEndpoint, apiBaseUrl } from 'appConstants';
import axios, { AxiosResponse } from 'axios';
import { ResetPasswordResponse } from './types';

const resetPassword = async (
  email: string,
): Promise<AxiosResponse<ResetPasswordResponse>> => {
  //eslint-disable-next-line no-useless-catch
  try {
    return await(await axios.post)<ResetPasswordResponse>(
      `${apiBaseUrl}${ApiEndpoint.AuthSendCodeResetPassword}`,
      {
        email,
      }
    );
  } catch (error) {
    throw error;
  }
};
export { resetPassword };
