/* eslint-disable arrow-body-style */
import React, { useCallback, useState } from 'react';
import { Alert, Button, Input } from 'rsuite';
import { auth } from '../../misc/firebase';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');

  const onEmailInputChange = useCallback(value => {
    setEmail(value);
  }, []);

  const onForgotPasswordClick = () => {
    Promise.resolve(auth.sendPasswordResetEmail(email))
      .then(() => {
        Alert.success('Password reset email sent to your email', 4000);
        window.location.reload();
      })
      .catch(err => {
        Alert.error(err.message, 4000);
      });
  };

  return (
    <div>
      <Input
        placeholder="someone@example.com"
        type="email"
        onChange={onEmailInputChange}
        value={email}
      />
      <br />
      <Button block color="cyan" onClick={onForgotPasswordClick}>
        Forgot Password
      </Button>
    </div>
  );
};

export default ForgotPassword;

// try {
//   Promise.resolve(auth.sendPasswordResetEmail(email)).then(() => {
//     Alert.success('Password reset link sent to your email', 4000);
//     window.location.reload();
//   });
// } catch (error) {
//   Alert.error(error.message, 4000);
// }
