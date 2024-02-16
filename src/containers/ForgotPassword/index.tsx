import { FC, useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';

import { ConfirmEmail } from 'components';
import { AuthErrorTransformResult } from 'types';

import {
  authChangePassword,
  authConfirmCode,
} from 'store/auth/actionCreators';

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
  const dispatch = useDispatch();

  const [currentStep, setCurrentStep] = useState(
    ForgotPasswordStep.ResetPasswordStep,
  );

  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [otpError, setOpError] = useState('');

  const emailResetSuccessCallback = () => {
    setCurrentStep(ForgotPasswordStep.ConfirmEmailStep);
  };

  const emailSuccessCallback = () => {
    setCurrentStep(ForgotPasswordStep.NewPasswordStep);
  };

  const emailErrorCallback = useCallback((error: AuthErrorTransformResult) => {
    if (error.fields.email) setEmailError(error.fields.email);
  }, []);

  const resetPasswordHandler = useCallback(
    (value: string, reset = false) => {
      dispatch(
        authConfirmCode({
          email: value,
          successCallback: reset ? emailResetSuccessCallback : emailSuccessCallback,
          errorCallback: emailErrorCallback,
        }),
      );
      setEmail(value);
    },
    [dispatch, emailErrorCallback],
  );

  const resetPasswordBackHandler = useCallback(() => {
    setCurrentStep(ForgotPasswordStep.ResetPasswordStep);
    onBack();
  }, [onBack]);

  const passwordSuccessCallback = useCallback(() => {
    setCurrentStep(ForgotPasswordStep.ConfirmEmailStep);
  }, []);

  const newPasswordErrorCallback = (error: AuthErrorTransformResult) => {
    setOpError(error.fields['code'] ?? error.message);
    setCurrentStep(ForgotPasswordStep.ConfirmEmailStep);
  };

  const confirmVerificationCodeHandler = useCallback(
    (verificationCode: string) => {
      dispatch(
        authChangePassword({
          verificationCode,
          successCallback: () => {
            setCurrentStep(ForgotPasswordStep.SuccessStep);
          },
          errorCallback: newPasswordErrorCallback,
        }),
      );
    },
    [dispatch],
  );

  const successHandler = useCallback(() => {
    onSuccess();
  }, [onSuccess]);

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

      {currentStep === ForgotPasswordStep.NewPasswordStep && (
      <NewPassword
        onBack={() => setCurrentStep(ForgotPasswordStep.ResetPasswordStep)}
        onSuccess={passwordSuccessCallback}
      />
      )}

      {currentStep === ForgotPasswordStep.ConfirmEmailStep && (
        <ConfirmEmail
          email={email}
          onBack={() => setCurrentStep(ForgotPasswordStep.NewPasswordStep)}
          onConfirm={confirmVerificationCodeHandler}
          onResend={() => resetPasswordHandler(email, true)}
          error={otpError}
          setError={setOpError}
        />
      )}

      {currentStep === ForgotPasswordStep.SuccessStep && (
        <Success onConfirm={successHandler} />
      )}
    </>
  );
};
