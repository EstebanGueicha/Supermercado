import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import firebase from 'firebase/firebase';

//Conexion Con Firebase
firebase.initializeApp({
  apiKey: ***************,
  authDomain: ***************,
  databaseURL: ***************,
  projectId: ***************,
  storageBucket: "",
  messagingSenderId: ***************",
  appId: ***************a"
});
let db = firebase.firestore();

export default db;

ReactDOM.render(
  <App />
  , document.getElementById('root'));
serviceWorker.unregister();
