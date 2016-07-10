import React, {Component} from 'react';
import block from 'bem-cn';
import Menu from 'components/Menu';
import Playlist from 'components/Playlist';

import UserModel from 'models/User';
import Album from 'models/Album';
import {fetch as fetchAlbums} from 'actions/albums';
import {fetchAll, fetchRecomended, fetchWall, fetchPopular, fetchAlbum} from 'actions/audios';
import {withRouter} from 'react-router'
import {connect} from 'react-redux'

const mapStateToProps = (state) => {
  return {
    user: new UserModel(state.user),
    albums: state.albums,
    audios: state.audios
  };
};

const app = block('app');

class Albums extends Component {
  componentDidMount() {
    this.fetchAlbums().then(() => this.fetchAudios());
  }

  componentDidUpdate(prevProps) {
    if (prevProps.params.id !== this.props.params.id) {
      this.fetchAudios();
    }
  }

  fetchAlbums() {
    const {user, fetchAlbums} = this.props;

    return fetchAlbums(user.getId())
  }

  fetchAudios() {
    const {
      params,
      user,
      albums,
      fetchAll,
      fetchRecomended,
      fetchWall,
      fetchPopular,
      fetchAlbum
    } = this.props;

    if (!params.id) {
      return;
    }

    const albumId = Number(params.id);
    const getAlbumTitle = () => (albums.items.find((album) => album.id === albumId).title);

    switch (params.id) {
      case 'all':
        return fetchAll(user.getId());
      case 'recomended':
        return fetchRecomended(user.getId());
      case 'wall':
        return fetchWall(user.getId());
      case 'popular':
        return fetchPopular(user.getId());
      default:
        return fetchAlbum(user.getId(), albumId, getAlbumTitle());
    }
  }

  mapAlbum = (album) => {
    return {
      id: album.getId(),
      url: `/albums/${album.getId()}`,
      name: album.getName()
    }
  };

  static getDefaultItems() {
    return Album.hydrateArray([
      {id: 'all', title: 'All'},
      {id: 'recomended', title: 'Recomended'},
      {id: 'wall', title: 'Wall'},
      {id: 'popular', title: 'Popular'}
    ]);
  }

  render() {
    const {albums, audios} = this.props;
    const items = Album.hydrateArray(albums.items);
    const defaultItems = Albums.getDefaultItems();

    return (
      <section className={app('section')}>
        <div className={app('nav')}>
          <Menu items={[...defaultItems, ...items].map(this.mapAlbum)}/>
        </div>
        <div className={app('content')}><Playlist playlist={audios}/></div>
      </section>
    );
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
