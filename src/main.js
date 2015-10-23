import React, { Component } from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';

import { ReduxRouter } from 'redux-router';
import { Route } from 'react-router';

import { Provider } from 'react-redux';
import { DevTools, DebugPanel, LogMonitor } from 'redux-devtools/lib/react';
import { combineReducers } from 'redux';
import { AudioContext } from 'services';

import createStore from './createStore';

import * as reducers from 'reducers';
import * as actions from 'actions';

import {
  AppPage,
  AlbumsPage,
  AlbumViewPage,
  GroupsPage,
  GroupViewPage,
  FriendsPage,
  FriendViewPage
} from 'pages';

injectTapEventPlugin();

const reducer = combineReducers(reducers);
const store = createStore(reducer);
const audioContext = AudioContext.create();

store.audio = audioContext;

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
          { () => (
            <ReduxRouter store={store}>
              <Route path="/" component={AppPage} store={store}>
                <Route path="albums" component={AlbumsPage}>
                  <Route path=":album" component={AlbumViewPage}/>
                </Route>
                <Route path="groups" component={GroupsPage}>
                  <Route path=":group" component={GroupViewPage}/>
                </Route>
                <Route path="friends" component={FriendsPage}>
                  <Route path=":friend" component={FriendViewPage}/>
                </Route>
              </Route>
            </ReduxRouter>
          ) }
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
