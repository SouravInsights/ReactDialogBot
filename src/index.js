import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
// We are importing React, ReactDOM and Provider from React Redux.

import App from './App';
import { store } from './chat';
import 'milligram';
ReactDOM.render(
    <Provider store={store}><App /></Provider>, document.getElementById('root'));

/* Provider is something that allows the states, which are stored in our Redux Store to be accessible by all other
   components present in our root file i.e, App.js. */