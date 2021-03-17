/* eslint-disable object-shorthand */
/* eslint-disable arrow-body-style */
import React, { useCallback, useState } from 'react';
import firebase from 'firebase/app';
import { Alert, Button, Col, Container, Grid, Input, Panel, Row } from 'rsuite';
import { auth, database } from '../../misc/firebase';
import LogIn from './LogIn';
// import { auth, database } from '../misc/firebase';

const SignInWithEmail = () => {
  const [login, setLogin] = useState(false);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const onEmailInputChange = useCallback(value => {
    setEmail(value);
  }, []);

  const onNameInputChange = useCallback(value => {
    setName(value);
  }, []);

  const onPasswordInputChange = useCallback(value => {
    setPassword(value);
  }, []);

  const onLoginClick = () => {
    setLogin(true);
  };

  const register = () => {
    try {
      auth.createUserWithEmailAndPassword(email, password).then(data => {
        try {
          database.ref(`/profiles/${data.user.uid}`).set({
            name: name,
            createdAt: firebase.database.ServerValue.TIMESTAMP,
          });
        } catch (error) {
          Alert.error(error.message, 4000);
        }
      });
      Alert.success('User Created', 4000);
    } catch (error) {
      Alert.error(error.message, 4000);
    }
  };

  return (
    <Container>
      <Grid className="mt-page">
        <Row>
          <Col xs={24} md={12} mdOffset={6}>
            <Panel>
              {!login && (
                <div>
                  <div className="text-center">
                    <h2>Welcome to Chat</h2>
                    <p>Progressive chat platform for neophytes</p>
                  </div>
                  <div className="mt-3">
                    <Input
                      placeholder="Someone"
                      onChange={onNameInputChange}
                      value={name}
                    />
                    <br />
                    <Input
                      placeholder="someone@example.com"
                      value={email}
                      onChange={onEmailInputChange}
                    />
                    <br />
                    <Input
                      placeholder="*******"
                      type="password"
                      value={password}
                      onChange={onPasswordInputChange}
                    />
                    <br />
                    <Button block color="orange" onClick={register}>
                      Register
                    </Button>
                    <Button block color="cyan" onClick={onLoginClick}>
                      Log In
                    </Button>
                  </div>
                </div>
              )}
              {login && <LogIn />}
            </Panel>
          </Col>
        </Row>
      </Grid>
    </Container>
  );
};

export default SignInWithEmail;
