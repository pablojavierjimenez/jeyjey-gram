import React from 'react';
import ReactDOM from 'react-dom';
import firebase from 'firebase';

import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

// Initialize Firebase
firebase.initializeApp({
  apiKey: "AIzaSyCs3GJgoCYJZ0Ex3OaizGsvcxWoCxabPUU",
  authDomain: "jeyjeygram.firebaseapp.com",
  databaseURL: "https://jeyjeygram.firebaseio.com",
  projectId: "jeyjeygram",
  storageBucket: "jeyjeygram.appspot.com",
  messagingSenderId: "1080625653128"
});

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
