import React, { Component } from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';

import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import { reduxReactRouter, ReduxRouter } from 'redux-router';
import promiseMiddleware from 'redux-promise';

import { Provider } from 'react-redux';
import { Route } from 'react-router';
import { DevTools, DebugPanel, LogMonitor } from 'redux-devtools/lib/react';
import createHistory from 'history/lib/createBrowserHistory';

import { thunkMiddleware } from 'middlewares';
import * as reducers from 'reducers';
import * as actions from 'actions';
import { IndexPage, AlbumPage } from 'pages';
import { AudioContext } from 'services';

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
const audioContext = AudioContext.create();

injectTapEventPlugin();

const ThemeManager = require('material-ui/lib/styles/theme-manager');
const LightRawTheme = require('material-ui/lib/styles/raw-themes/light-raw-theme');

export default class Root extends Component {

  constructor(props, context) {
    super(props, context);

    const muiTheme = ThemeManager.getMuiTheme(LightRawTheme);

    this.state = {
      muiTheme: ThemeManager.modifyRawThemePalette(muiTheme, {
        accent1Color: '#567ca4'
      })
    };
  }

  getChildContext() {
    return {
      muiTheme: this.state.muiTheme
    };
  }

  componentDidMount() {
    const { appID } = this.props;

    Root.appendScript();

    window.vkAsyncInit = function vkAsyncInit() {
      VK.init({apiId: appID});
      store.dispatch(actions.app.init(VK));
    };
  }

  render() {
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
                <Route path="album/:album/:audio" component={AlbumPage}/>
              </Route>
            </ReduxRouter>

          )}
        </Provider>
        {devtools}
        <div id="vk-api-transport"></div>
      </div>
    );
  }

  static appendScript() {
    const el = document.createElement('script');
    const transport = document.getElementById('vk-api-transport');

    el.type = 'text/javascript';
    el.src = '//vk.com/js/api/openapi.js';
    el.async = true;

    transport.appendChild(el);
  }
}

Root.childContextTypes = {
  muiTheme: React.PropTypes.object
};

React.render(<Root appID="4966083"/>, document.getElementById('content'));
