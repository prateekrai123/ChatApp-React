/* eslint-disable arrow-body-style */
import React from 'react';
import firebase from 'firebase/app';
import { Alert, Button, Container, Icon } from 'rsuite';
import { auth, database } from '../../misc/firebase';

const SignIn = () => {
  const signInWithProvider = async provider => {
    try {
      const { additionalUserInfo, user } = await auth.signInWithPopup(provider);

      if (additionalUserInfo.isNewUser) {
        await database.ref(`/profiles/${user.uid}`).set({
          name: user.displayName,
          createdAt: firebase.database.ServerValue.TIMESTAMP,
        });
      }

      Alert.success('Signed in', 4000);
    } catch (err) {
      Alert.error(err.message, 4000);
    }
  };

  const onFacebookSignIn = () => {
    signInWithProvider(new firebase.auth.FacebookAuthProvider());
  };

  const onGoogleSignIn = () => {
    signInWithProvider(new firebase.auth.GoogleAuthProvider());
  };

  return (
    <Container>
      <div className="mt-3">
        <center>
          <Button color="blue" onClick={onFacebookSignIn}>
            <Icon icon="facebook" />
          </Button>
          <span> </span>
          <Button color="green" onClick={onGoogleSignIn}>
            <Icon icon="google" />
          </Button>
        </center>
      </div>
    </Container>
  );
};

export default SignIn;
