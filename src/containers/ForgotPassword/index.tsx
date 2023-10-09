import { FC, useCallback, useState } from 'react';

import { ConfirmEmail } from 'components';
import { useDispatch } from 'react-redux';
import {
  authChangePassword,
  authConfirmCode,
  authSetState,
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
  const [currentStep, setCurrentStep] = useState(
    ForgotPasswordStep.ResetPasswordStep,
  );

  const [email, setEmail] = useState('');

  const dispatch = useDispatch();

  const resetPasswordHandler = useCallback(
    (value: string) => {
      const successCallback = () => {
        setCurrentStep(ForgotPasswordStep.ConfirmEmailStep);
      };

      dispatch(
        authConfirmCode({
          email: value,
          successCallback,
        }),
      );
      setEmail(value);
    },
    [dispatch],
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

  const confirmNewPasswordHandler = useCallback(
    (password: string) => {
      const errorCallback = () => {
        setCurrentStep(ForgotPasswordStep.ConfirmEmailStep);
      };

      dispatch(
        authChangePassword({
          password,
          successCallback: successHandler,
          errorCallback,
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
          onConfirm={resetPasswordHandler}
          onBack={resetPasswordBackHandler}
        />
      )}

      {currentStep === ForgotPasswordStep.ConfirmEmailStep && (
        <ConfirmEmail
          email={email}
          isShown
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
