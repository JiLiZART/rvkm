import React, {Component} from 'react';

import Layout from 'components/Layout';
import Base from './Base';

import User from 'models/User';
import Album from 'models/Album';
import {fetch as fetchAlbums} from 'actions/albums';
import {fetchAll, fetchRecomended, fetchWall, fetchPopular, fetchAlbum} from 'actions/audios';
import {withRouter} from 'react-router'
import {connect} from 'react-redux'

const mapStateToProps = (state) => ({
  user: new User(state.user),
  albums: state.albums,
  audios: state.audios.toJS(),
  menu: state.menu
});

const getTitle = (items, id) => ((items.find((i) => i.id === id) || {}).title);

class Albums extends Base {
  ID_ALL = 'all';
  ID_WALL = 'wall';
  ID_POPULAR = 'popular';
  ID_RECOMENDED = 'recomended';

  getDefaultItems() {
    return [
      {id: this.ID_ALL, title: 'All'},
      {id: this.ID_RECOMENDED, title: 'Recomended'},
      {id: this.ID_WALL, title: 'Wall'},
      {id: this.ID_POPULAR, title: 'Popular'}
    ];
  }

  fetchItems() {
    const {user, fetchAlbums} = this.props;

    return fetchAlbums(user.getId())
  }

  fetchAudios(offset = 0) {
    const {
      params:{id},
      user,
      albums:{items},
      fetchRecomended,
      fetchWall,
      fetchAll,
      fetchPopular,
      fetchAlbum,
      router
    } = this.props;

    !id && router.push(`/albums/${this.ID_RECOMENDED}`);

    switch (id) {
      case this.ID_RECOMENDED:
        return fetchRecomended(user.getId(), offset, this.COUNT);
      case this.ID_WALL:
        return fetchWall(user.getId(), offset, this.COUNT);
      case this.ID_POPULAR:
        return fetchPopular(user.getId(), offset, this.COUNT);
      case this.ID_ALL:
        return fetchAll(user.getId(), offset, this.COUNT);
      default:
        return fetchAlbum(user.getId(), Number(id), getTitle(items, Number(id)), offset, this.COUNT);
    }
  }

  mapItem = (id) => (album) => ({
    id: album.getId(),
    url: `/albums/${album.getId()}`,
    name: album.getName(),
    active: album.getId() === id
  });

  render() {
    const {audios, menu} = this.props;
    const items = this._getItems();

    return (<Layout menu={menu.visible} items={items} audios={audios} onMore={this.onMoreClick(audios)}/>);
  }

  _getItems() {
    const {albums} = this.props;
    const albumsItems = albums.items;
    const defaultItems = this.getDefaultItems();
    return Album.hydrateArray([...defaultItems, ...albumsItems]).map(this.mapItem(this.props.params.id))
  }
}

export default withRouter(connect(
  mapStateToProps,
  {
    fetchAlbums,
    fetchAll,
    fetchRecomended,
    fetchWall,
    fetchPopular,
    fetchAlbum
  }
)(Albums));
