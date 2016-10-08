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
  audios: state.audios,
  menu: state.menu
});

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
      params,
      user,
      albums,
      fetchRecomended,
      fetchWall,
      fetchAll,
      fetchPopular,
      fetchAlbum,
      router
    } = this.props;

    const {items} = albums;
    const id = Number(params.id);
    const getTitle = (items, id) => ((items.find((item) => item.id === id) || {}).title);

    if (!params.id) {
      router.push('/albums/recomended');
    }

    this.setState({audiosOffset: offset});

    switch (params.id) {
      case this.ID_RECOMENDED:
        return fetchRecomended(user.getId(), offset, this.COUNT);
      case this.ID_WALL:
        return fetchWall(user.getId(), offset, this.COUNT);
      case this.ID_POPULAR:
        return fetchPopular(user.getId(), offset, this.COUNT);
      case this.ID_ALL:
        return fetchAll(user.getId(), offset, this.COUNT);
      default:
        return fetchAlbum(user.getId(), id, getTitle(items, id), offset, this.COUNT);
    }
  }

  mapItem = (album) => ({
    id: album.getId(),
    url: `/albums/${album.getId()}`,
    name: album.getName(),
    active: album.getId() == this.props.params.id
  });

  render() {
    const {albums, audios, menu} = this.props;
    const albumsItems = albums.items;
    const defaultItems = this.getDefaultItems();
    const items = Album.hydrateArray([...defaultItems, ...albumsItems]).map(this.mapItem);

    return (<Layout menu={menu.visible} items={items} audios={audios} onMore={this.onMoreClick}/>);
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
