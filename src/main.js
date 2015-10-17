import React, { Component } from 'react';

import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import { reduxReactRouter, ReduxRouter } from 'redux-router';

import thunkMiddleware from './middlewares/thunkMiddleware.js';
import promiseMiddleware from 'redux-promise';

import { Provider } from 'react-redux';
import { Route } from 'react-router';
import { DevTools, DebugPanel, LogMonitor } from 'redux-devtools/lib/react';
import createHistory from 'history/lib/createBrowserHistory';

import * as reducers from './reducers';
import * as actions from './actions';
import { IndexPage, AlbumPage } from './pages';

let finalCreateStore;

if (__DEVTOOLS__) {
  const { devTools } = require('redux-devtools');
  finalCreateStore = compose(
    applyMiddleware(promiseMiddleware, thunkMiddleware),
    reduxReactRouter({createHistory}),
    devTools()
  )(createStore);
} else {
  finalCreateStore = compose(
    applyMiddleware(promiseMiddleware, thunkMiddleware),
    reduxReactRouter({createHistory})
  )(createStore);
}

const reducer = combineReducers(reducers);
const store = finalCreateStore(reducer);
const audioContext = new Audio();

export default class Root extends Component {

  static appendScript() {
    let el;
    let transport;

    transport = document.getElementById('vk-api-transport');
    el = document.createElement('script');
    el.type = 'text/javascript';
    el.src = '//vk.com/js/api/openapi.js';
    el.async = true;

    if (transport) {
      transport.appendChild(el);
    }
  }

  componentDidMount() {
    const { appID } = this.props;

    Root.appendScript();

    console.log('Root.componentDidMount', store);

    window.vkAsyncInit = function vkAsyncInit() {
      VK.init({apiId: appID});
      store.dispatch(actions.app.init(VK));
    };
  }

  render() {
    console.log('Root.render');
    let devtools = null;

    if (__DEVTOOLS__) {
      devtools = (
        <DebugPanel top right bottom>
          <DevTools store={store} monitor={LogMonitor}/>
        </DebugPanel>
      );
    }

    return (
      <div>
        <Provider store={store}>
          {() => (

            <ReduxRouter store={store}>
              <Route path="/" component={IndexPage} audioContext={audioContext}>
                <Route path="album" component={AlbumPage}/>
                <Route path="album/:album" component={AlbumPage}/>
                <Route path="album/:album/:file" component={AlbumPage}/>
              </Route>
            </ReduxRouter>

          )}
        </Provider>
        {devtools}
        <div id="vk-api-transport"></div>
      </div>
    );
  }
}

React.render(<Root appID='4966083'/>, document.getElementById('root'));
