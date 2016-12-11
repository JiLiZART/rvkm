import 'babel-polyfill';
import React from 'react';
import {render} from 'react-dom';
import configureStore from './configureStore';
import Root from 'containers/Root';
import Api from 'models/Api';
import {init} from 'actions/player';

Api.appendScript();

window.vkAsyncInit = function vkAsyncInit() {
  VK.init({apiId: '4966083'});

  const store = configureStore();

  store.dispatch(init());

  render(
    <Root store={store}/>,
    document.getElementById('root')
  );
};
