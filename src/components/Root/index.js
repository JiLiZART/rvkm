import React, {PropTypes} from 'react';
import {Provider} from 'react-redux';
import {Router, Route, IndexRoute, Redirect, browserHistory, hashHistory} from 'react-router';
import App from 'components/App';
import Albums from 'components/Albums';
import Friends from 'components/Friends';
import Groups from 'components/Groups';

import './index.styl';

const Root = ({store}) => (
  <Provider store={store}>
    <Router history={hashHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={Albums}/>
        <Route path="albums/(:id)" component={Albums}/>
        <Route path="friends/(:id)" component={Friends}/>
        <Route path="groups/(:id)" component={Groups}/>
      </Route>
      <Redirect from="*" to="/"/>
    </Router>
  </Provider>
);

Root.propTypes = {
  store: PropTypes.object.isRequired
};

export default Root;
