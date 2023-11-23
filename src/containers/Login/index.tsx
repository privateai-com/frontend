import { useState } from 'react';

import { ForgotPassword } from 'containers';
import { Sign } from './Sign';

export const Login = () => {
  const [localEmail, setLocalEmail] = useState('');
  const [isShowForgotPassword, setIsShowForgotPassword] = useState(false);

  return (
    <>
      {isShowForgotPassword && (
        <ForgotPassword
          onBack={() => setIsShowForgotPassword(false)}
          onSuccess={() => setIsShowForgotPassword(false)}
        />
      )}
      {!isShowForgotPassword && (
        <Sign
          onRestore={() => setIsShowForgotPassword(true)}
          email={localEmail}
          setEmail={setLocalEmail}
        />
      )}
    </>
  );
};
