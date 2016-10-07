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
const COUNT = 100;

class Albums extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      audiosOffset: 0
    }
  }

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

  fetchAudios(offset = 0, count = COUNT) {
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
    const getTitle = () => (items.find((item) => item.id === id).title);

    if (!params.id) {
      router.push('/albums/recomended');
    }

    this.setState({audiosOffset: offset});

    switch (params.id) {
      case 'recomended':
        return fetchRecomended(user.getId(), offset, count);
      case 'wall':
        return fetchWall(user.getId(), offset, count);
      case 'popular':
        return fetchPopular(user.getId(), offset, count);
      case 'all':
        return fetchAll(user.getId(), offset, count);
      default:
        return fetchAlbum(user.getId(), id, getTitle(), offset, count);
    }
  }

  mapAlbum = (album) => ({
    id: album.getId(),
    url: `/albums/${album.getId()}`,
    name: album.getName(),
    active: album.getId() == this.props.params.id
  });

  static getDefaultItems() {
    return Album.hydrateArray([
      {id: 'all', title: 'All'},
      {id: 'recomended', title: 'Recomended'},
      {id: 'wall', title: 'Wall'},
      {id: 'popular', title: 'Popular'}
    ]);
  }

  onMoreClick = (done) => {
    const {audiosOffset} = this.state;

    this.fetchAudios(audiosOffset + COUNT).then(() => done());
  };

  render() {
    const {albums, audios} = this.props;
    const items = Album.hydrateArray(albums.items);
    const defaultItems = Albums.getDefaultItems();

    return (
      <section className={app('section')}>
        <div className={app('nav')}>
          <Menu items={[...defaultItems, ...items].map(this.mapAlbum)}/>
        </div>
        <div className={app('content')}>
          <Playlist playlist={audios} onMore={this.onMoreClick}/>
        </div>
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
