import { FC, useCallback, useState } from 'react';

import { ConfirmEmail } from 'components';
import { resetPassword } from 'api/resetPassword';
import { ResetPassword } from './ResetPassword';
import { NewPassword } from './NewPassword';
import { Success } from './Success';

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

  const resetPasswordHandler = useCallback(async (value: string) => {
    setEmail(value);
    const res = await resetPassword(value);
    
    if(res.data.statusCode === 200) {
      setCurrentStep(ForgotPasswordStep.ConfirmEmailStep);
    } 
  }, []);

  const confirmEmailHandler = useCallback(() => {
    setCurrentStep(ForgotPasswordStep.NewPasswordStep);
  }, []);

  const resetPasswordBackHandler = useCallback(() => {
    setCurrentStep(ForgotPasswordStep.ResetPasswordStep);
    onBack();
  }, [onBack]);

  const confirmNewPasswordHandler = useCallback(() => {
    setCurrentStep(ForgotPasswordStep.SuccessStep);
  }, []);

  const successHandler = useCallback(() => {
    onSuccess();
  }, [onSuccess]);

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
