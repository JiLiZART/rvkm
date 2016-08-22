import React, {Component} from 'react';
import block from 'bem-cn';
import Menu from 'components/Menu';
import Playlist from 'components/Playlist';

import UserModel from 'models/User';
import Group from 'models/Group';
import {fetch as fetchGroups} from 'actions/groups';
import {fetchGroup} from 'actions/audios';
import {withRouter} from 'react-router'
import {connect} from 'react-redux'

const mapStateToProps = (state) => {
  return {
    user: new UserModel(state.user),
    groups: state.groups,
    audios: state.audios
  };
};

const app = block('app');

class Groups extends Component {
  componentDidMount() {
    this.fetchGroups().then(() => this.fetchAudios());
  }

  componentDidUpdate(prevProps) {
    if (prevProps.params.id !== this.props.params.id) {
      this.fetchAudios();
    }
  }

  fetchGroups() {
    const {user, fetchGroups} = this.props;

    return fetchGroups(user.getId());
  }

  fetchAudios() {
    const {
      groups,
      fetchGroup,
      params,
      router
    } = this.props;

    const {items} = groups;
    const id = Number(params.id);
    const getTitle = () => (items.find((group) => group.id === id).name);

    if (!params.id && items.length) {
      router.push(`/groups/${items[0].id}`);
    }

    return fetchGroup(`-${id}`, getTitle());
  }

  mapGroup = (group) => {
    return {
      id: group.getId(),
      url: `/groups/${group.getId()}`,
      cover: group.getAvatar(),
      name: group.getName()
    }
  };

  render() {
    const {groups, audios} = this.props;
    const items = Group.hydrateArray(groups.items);

    return (
      <section className={app('section')}>
        <div className={app('nav')}>
          <Menu items={items.map(this.mapGroup)}/>
        </div>
        <div className={app('content')}><Playlist playlist={audios}/></div>
      </section>
    );
  }
}

export default withRouter(connect(
  mapStateToProps,
  {fetchGroups, fetchGroup}
)(Groups));
