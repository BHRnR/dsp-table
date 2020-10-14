import React from 'react';
import ReactDOM from 'react-dom';

import App from './App'
import app from 'firebase'

import './index.css';
import * as serviceWorker from './serviceWorker';
//import Clock from './Text';

const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
};

app.initializeApp(config)

ReactDOM.render(<App />, document.getElementById('root'));

serviceWorker.unregister();