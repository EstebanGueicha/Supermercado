import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import firebase from 'firebase/firebase';

//Conexion Con Firebase
firebase.initializeApp({
  apiKey: "AIzaSyAxLq2cg754JRGm0vUwqggydPgUh7XSAxE",
  authDomain: "superuadefour.firebaseapp.com",
  databaseURL: "https://superuadefour.firebaseio.com",
  projectId: "superuadefour",
  storageBucket: "",
  messagingSenderId: "266913830233",
  appId: "1:266913830233:web:f5771a72c68b528a"
});
let db = firebase.firestore();

export default db;

ReactDOM.render(
  <App />
  , document.getElementById('root'));
serviceWorker.unregister();
