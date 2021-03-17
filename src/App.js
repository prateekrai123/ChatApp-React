import React from 'react';
import { Switch } from 'react-router';
import 'rsuite/dist/styles/rsuite-default.css';
import './styles/main.scss';
import PrivateRoute from './components/PrivateRoute';
import Home from './pages/Home';
import PublicRoute from './components/PublicRoute';
import { ProfileProvider } from './context/profile.context';
import SignInWithEmail from './pages/Auth/SignInWithEmail';

function App() {
  return (
    <div>
      <ProfileProvider>
        <Switch>
          <PublicRoute path="/signin">
            <SignInWithEmail />
          </PublicRoute>
          <PrivateRoute path="/">
            <Home />
          </PrivateRoute>
        </Switch>
      </ProfileProvider>
    </div>
  );
}

export default App;
