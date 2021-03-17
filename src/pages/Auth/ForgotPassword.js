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
    try {
      Promise.resolve(auth.sendPasswordResetEmail(email));
      Alert.success('Password reset email sent');
    } catch (error) {
      Alert.error(error.message);
    }
  };

  return (
    <div>
      <Input
        placeholder="someone@example.com"
        type="email"
        onChange={onEmailInputChange}
        value={email}
      />
      <Button block color="cyan" onClick={onForgotPasswordClick}>
        Forgot Password
      </Button>
    </div>
  );
};

export default ForgotPassword;
