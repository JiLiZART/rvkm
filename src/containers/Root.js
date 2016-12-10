import React, {PropTypes, PureComponent} from 'react';
import {Provider} from 'react-redux';
import {Router, Route, IndexRoute, Redirect, browserHistory, hashHistory} from 'react-router';
import App from 'components/App';
import Albums from 'containers/Albums';
import Friends from 'containers/Friends';
import Groups from 'containers/Groups';

class Root extends PureComponent {
  render() {
    const {store} = this.props;

    return (
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
    )
  }
}

Root.propTypes = {
  store: PropTypes.object.isRequired
};

export default Root;
