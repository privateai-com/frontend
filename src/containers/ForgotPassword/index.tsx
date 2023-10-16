import { FC, useCallback, useState } from 'react';

import { ConfirmEmail } from 'components';
import { useDispatch } from 'react-redux';
import {
  authChangePassword,
  authConfirmCode,
  authSetState,
} from 'store/auth/actionCreators';

import { AuthErrorTransformResult } from 'types';
import { Success } from './Success';
import { NewPassword } from './NewPassword';
import { ResetPassword } from './ResetPassword';

enum ForgotPasswordStep {
  ResetPasswordStep,
  ConfirmEmailStep,
  NewPasswordStep,
  SuccessStep,
}

interface ForgotPasswordProps {
  onBack: () => void;
  onSuccess: () => void;
}

export const ForgotPassword: FC<ForgotPasswordProps> = ({
  onBack,
  onSuccess,
}) => {
  const [currentStep, setCurrentStep] = useState(
    ForgotPasswordStep.ResetPasswordStep,
  );

  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');

  const dispatch = useDispatch();

  const emailErrorSuccessCallback = () => {
    setCurrentStep(ForgotPasswordStep.ConfirmEmailStep);
  };

  const emailErrorCallback = useCallback((error: AuthErrorTransformResult) => {
    if (error.fields.email) setEmailError(error.fields.email);
  }, []);

  const resetPasswordHandler = useCallback(
    (value: string) => {
      dispatch(
        authConfirmCode({
          email: value,
          successCallback: emailErrorSuccessCallback,
          errorCallback: emailErrorCallback,
        }),
      );
      setEmail(value);
    },
    [dispatch, emailErrorCallback],
  );

  const confirmEmailHandler = useCallback(
    (value: string) => {
      dispatch(authSetState({ verificationCode: value }));
      setCurrentStep(ForgotPasswordStep.NewPasswordStep);
    },
    [dispatch],
  );

  const resetPasswordBackHandler = useCallback(() => {
    setCurrentStep(ForgotPasswordStep.ResetPasswordStep);
    onBack();
  }, [onBack]);

  const successHandler = useCallback(() => {
    onSuccess();
  }, [onSuccess]);

  const newPasswordErrorCallback = () => {
    setCurrentStep(ForgotPasswordStep.ConfirmEmailStep);
  };

  const confirmNewPasswordHandler = useCallback(
    (password: string) => {
      dispatch(
        authChangePassword({
          password,
          successCallback: successHandler,
          errorCallback: newPasswordErrorCallback,
        }),
      );

      setCurrentStep(ForgotPasswordStep.SuccessStep);
    },
    [dispatch, successHandler],
  );

  return (
    <>
      {currentStep === ForgotPasswordStep.ResetPasswordStep && (
        <ResetPassword
          emailError={emailError}
          setEmailError={setEmailError}
          onConfirm={resetPasswordHandler}
          onBack={resetPasswordBackHandler}
        />
      )}

      {currentStep === ForgotPasswordStep.ConfirmEmailStep && (
        <ConfirmEmail
          email={email}
          onBack={() => setCurrentStep(ForgotPasswordStep.ResetPasswordStep)}
          onConfirm={confirmEmailHandler}
        />
      )}

      {currentStep === ForgotPasswordStep.NewPasswordStep && (
        <NewPassword onConfirm={confirmNewPasswordHandler} />
      )}

      {currentStep === ForgotPasswordStep.SuccessStep && (
        <Success onConfirm={successHandler} />
      )}
    </>
  );
};
