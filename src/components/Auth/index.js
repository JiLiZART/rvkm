import React, {Component} from 'react';
import block from 'bem-cn';
import './index.styl';

import Button from 'components/Button';
import Spinner from 'components/Spinner';
import User from 'models/User';
import {login} from 'actions/user';
import {connect} from 'react-redux'

const mapStateToProps = (state) => {
  return {
    user: new User(state.user)
  };
};

const app = block('app');
const auth = block('auth');

class Auth extends Component {
  render() {
    const {onLoginClick, user} = this.props;

    if (user.inProgress()) {
      return (
        <div className={auth}>
          <Button className={auth('button')} size="l" view="action">
            <Spinner size="l" />
          </Button>
        </div>
      )
    }

    return (
      <div className={auth}>
        <div className={auth('info')}>
          <div className={auth('title')}>Начните слушать Музыку</div>
          <div className={auth('desc')}>прямо сейчас</div>
        </div>
        <Button className={auth('button')} onClick={onLoginClick} size="l" view="action">Войти с помощью VK</Button>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  {onLoginClick: login}
)(Auth);
