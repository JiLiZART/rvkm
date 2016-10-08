import React, {Component} from 'react';

import Layout from 'components/Layout';
import Base from './Base';

import User from 'models/User';
import Group from 'models/Group';
import {fetch as fetchGroups} from 'actions/groups';
import {fetchGroup} from 'actions/audios';
import {withRouter} from 'react-router'
import {connect} from 'react-redux'

const mapStateToProps = (state) => ({
  user: new User(state.user),
  groups: state.groups,
  audios: state.audios,
  menu: state.menu
});

class Groups extends Base {
  fetchItems() {
    const {user, fetchGroups} = this.props;

    return fetchGroups(user.getId());
  }

  fetchAudios(offset = 0) {
    const {
      groups,
      fetchGroup,
      params,
      router
    } = this.props;

    const {items} = groups;
    const id = Number(params.id);
    const getTitle = (items, id) => ((items.find((group) => group.id === id) || {}).name);

    if (!params.id && items.length) {
      router.push(`/groups/${items[0].id}`);
    }

    this.setState({audiosOffset: offset});

    return fetchGroup(`-${id}`, getTitle(items, id));
  }

  mapItem = (group) => ({
    id: group.getId(),
    url: `/groups/${group.getId()}`,
    cover: group.getAvatar(),
    name: group.getName(),
    active: group.getId() == this.props.params.id
  });

  render() {
    const {groups, audios, menu} = this.props;
    const items = Group.hydrateArray(groups.items).map(this.mapItem);

    return (<Layout menu={menu.visible} items={items} audios={audios} onMore={this.onMoreClick}/>);
  }
}

export default withRouter(connect(
  mapStateToProps,
  {fetchGroups, fetchGroup}
)(Groups));
