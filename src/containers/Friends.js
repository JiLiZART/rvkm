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
  audios: state.audios.toJS(),
  menu: state.menu
});

const getTitle = (items, id) => (items.find((u) => u.id === id) || {}).name;

class Friends extends Base {
  fetchItems() {
    const {user, fetchFriends} = this.props;

    return fetchFriends(user.getId());
  }

  fetchAudios(offset = 0) {
    const {
      fetchFriend,
      params:{id},
      router
    } = this.props;

    const items = this.getItems();

    if (!id && items.length) {
      router.push(`/friends/${items[0].id}`);
      return;
    }

    return fetchFriend(id, getTitle(items, id), offset, this.COUNT);
  }

  mapItem = (id) => (user) => ({
    id: user.getId(),
    url: `/friends/${user.getId()}`,
    cover: user.getAvatar(),
    name: user.getFullName(),
    active: user.getId() == id
  });

  getItems() {
    return User.hydrateArray(this.props.friends.items).map(this.mapItem(this.props.params.id));
  }

  render() {
    const {audios, menu} = this.props;
    const items = this.getItems();

    return (<Layout menu={menu.visible} items={items} audios={audios} onMore={this.onMoreClick}/>);
  }
}

export default withRouter(connect(
  mapStateToProps,
  {fetchFriends, fetchFriend}
)(Friends));
