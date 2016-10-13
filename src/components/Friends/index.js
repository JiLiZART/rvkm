import React, {Component} from 'react';
import block from 'bem-cn';
import Menu from 'components/Menu';
import Playlist from 'components/Playlist';

import UserModel from 'models/User';
import {fetch as fetchFriends} from 'actions/friends';
import {fetchFriend} from 'actions/audios';
import {withRouter} from 'react-router'
import {connect} from 'react-redux'

const mapStateToProps = (state) => {
  return {
    user: new UserModel(state.user),
    friends: state.friends,
    audios: state.audios
  };
};

const app = block('app');

class Friends extends Component {
  componentDidMount() {
    this.fetchFriends().then(() => this.fetchAudios());
  }

  componentDidUpdate(prevProps) {
    if (prevProps.params.id !== this.props.params.id) {
      this.fetchAudios();
    }
  }

  fetchFriends() {
    const {user, fetchFriends} = this.props;

    return fetchFriends(user.getId());
  }

  fetchAudios() {
    const {
      friends,
      fetchFriend,
      params,
      router
    } = this.props;

    const {items} = friends;
    const id = Number(params.id);
    const getTitle = () => {
      const user = items.find((u) => u.id === id);

      return user ? (new UserModel(user)).getFullName() : '';
    };

    if (!params.id && items.length) {
      router.push(`/friends/${items[0].id}`);
    }

    return fetchFriend(id, getTitle());
  }

  mapFriend = (user) => {
    return {
      id: user.getId(),
      url: `/friends/${user.getId()}`,
      cover: user.getAvatar(),
      name: user.getFullName()
    }
  };

  render() {
    const {friends, audios} = this.props;
    const items = UserModel.hydrateArray(friends.items);

    return (
      <section className={app('section')}>
        <div className={app('nav')}>
          <Menu items={items.map(this.mapFriend)}/>
        </div>
        <div className={app('content')}><Playlist playlist={audios} /></div>
      </section>
    );
  }
}

export default withRouter(connect(
  mapStateToProps,
  {fetchFriends, fetchFriend}
)(Friends));
