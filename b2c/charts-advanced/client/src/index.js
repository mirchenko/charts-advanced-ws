import React from 'react';
import { hydrate } from 'react-dom';
import { Provider } from 'react-redux';
import Layout from './components/Layout';
import store from './store';
import '../scss/main.scss';

hydrate(
  <Provider store={store}>
    <Layout/>
  </Provider>,
  document.getElementById('app')
);