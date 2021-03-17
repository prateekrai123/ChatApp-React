/* eslint-disable arrow-body-style */
import React from 'react';
import { Redirect, Route } from 'react-router';
import { Container, Loader } from 'rsuite';
import { useProfile } from '../context/profile.context';

const PrivateRoute = ({ children, ...routeProps }) => {
  const { profile, isLoading, onSignInWithEmail } = useProfile();
  if (isLoading && !profile) {
    return (
      <Container>
        <Loader center vertical size="md" content="Loading" speed="slow" />
      </Container>
    );
  }

  if (!profile && !isLoading && !onSignInWithEmail) {
    return <Redirect to="/signin" />;
  }
  if (!profile && !isLoading && onSignInWithEmail) {
    return <Redirect to="/signinwithemail" />;
  }

  return <Route {...routeProps}>{children}</Route>;
};

export default PrivateRoute;
