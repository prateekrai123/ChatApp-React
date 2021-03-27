/* eslint-disable arrow-body-style */
import React, { useCallback, useState } from 'react';
import { Alert, Button, Input } from 'rsuite';
import { auth } from '../../misc/firebase';
import ForgotPassword from './ForgotPassword';

const LogIn = () => {
  const [forgotPassword, setForgotPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const onEmailInputChange = useCallback(value => {
    setEmail(value);
  }, []);

  const onPasswordInputChange = useCallback(value => {
    setPassword(value);
  }, []);

  const onForgotPasswordClick = () => {
    setForgotPassword(true);
  };

  const onLoginClick = () => {
    try {
      Promise.resolve(auth.signInWithEmailAndPassword(email, password)).catch(
        err => {
          Alert.error(err.message, 4000);
        }
      );
    } catch (err) {
      Alert.error(err.message, 4000);
    }
  };
  return (
    <div>
      <div className="text-center">
        <h2>Welcome to Chat</h2>
        <p>Progressive chat platform for neophytes</p>
      </div>
      {!forgotPassword && (
        <div className="mt-3">
          <Input
            placeholder="someone@example.com"
            type="email"
            onChange={onEmailInputChange}
            value={email}
          />
          <br />
          <Input
            placeholder="*******"
            type="password"
            onChange={onPasswordInputChange}
            value={password}
          />
          <br />
          <Button block color="orange" onClick={onLoginClick}>
            Log In
          </Button>
          <Button block color="cyan" onClick={onForgotPasswordClick}>
            Forgot Password
          </Button>
        </div>
      )}
      {forgotPassword && (
        <div>
          <br />
          <ForgotPassword />
        </div>
      )}
    </div>
  );
};

export default LogIn;
