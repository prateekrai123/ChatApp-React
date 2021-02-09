import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const config = {
  apiKey: 'AIzaSyDVBCE5SF5K6mNrA3XATR6QoHTckX-tGtU',
  authDomain: 'chat-web-app-f0164.firebaseapp.com',
  databaseURL: 'https://chat-web-app-f0164-default-rtdb.firebaseio.com',
  projectId: 'chat-web-app-f0164',
  storageBucket: 'chat-web-app-f0164.appspot.com',
  messagingSenderId: '781766453291',
  appId: '1:781766453291:web:3c5b1f6cc008a63429626e',
};

const app = firebase.initializeApp(config);

export const auth = app.auth();
export const database = app.database();
