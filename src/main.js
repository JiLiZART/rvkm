import 'babel-polyfill';
import React from 'react';
import {render} from 'react-dom';
import configureStore from './configureStore';
import Root from 'containers/Root';
import Api from 'models/Api';
import {status} from 'actions/user';
import {init} from 'actions/player';

const store = configureStore();

Api.appendScript();

window.vkAsyncInit = function vkAsyncInit() {
  VK.init({apiId: '4966083'});

  store.dispatch(status());
  store.dispatch(init());
};

render(
  <Root store={store}/>,
  document.getElementById('root')
);
