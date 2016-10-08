import React, {Component} from 'react';

import Layout from 'components/Layout';
import Base from './Base';

import User from 'models/User';
import {fetch as fetchFriends} from 'actions/friends';
import {fetchFriend} from 'actions/audios';
import {withRouter} from 'react-router'
import {connect} from 'react-redux'

const mapStateToProps = (state) => ({
  user: new User(state.user),
  friends: state.friends,
  audios: state.audios,
  menu: state.menu
});

class Friends extends Base {
  fetchItems() {
    const {user, fetchFriends} = this.props;

    return fetchFriends(user.getId());
  }

  fetchAudios(offset = 0) {
    const {
      friends,
      fetchFriend,
      params,
      router
    } = this.props;

    const {items} = friends;
    const id = Number(params.id);
    const getTitle = (items, id) => {
      const user = items.find((u) => u.id === id);

      return user ? (new User(user)).getFullName() : '';
    };

    if (!params.id && items.length) {
      router.push(`/friends/${items[0].id}`);
    }

    this.setState({audiosOffset: offset});

    return fetchFriend(id, getTitle(items, id), offset, this.COUNT);
  }

  mapItem = (user) => ({
    id: user.getId(),
    url: `/friends/${user.getId()}`,
    cover: user.getAvatar(),
    name: user.getFullName(),
    active: user.getId() == this.props.params.id
  });

  render() {
    const {friends, audios, menu} = this.props;
    const items = User.hydrateArray(friends.items).map(this.mapItem);

    return (<Layout menu={menu.visible} items={items} audios={audios} onMore={this.onMoreClick}/>);
  }
}

export default withRouter(connect(
  mapStateToProps,
  {fetchFriends, fetchFriend}
)(Friends));
