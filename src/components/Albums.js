import React, { Component } from 'react';
import { CircularProgress, List, ListItem } from 'material-ui';

export default class Albums extends Component {

  render() {
    const { albums, playlist, onItemClick } = this.props;
    const { fetching, error, items } = albums.toJS();
    let content;

    if (fetching) {
      content = (<CircularProgress mode="indeterminate" size={1.5}/>);
    }

    if (error) {
      content = 'Error loading albums';
    }

    if (!error && !fetching) {
      content = Object.keys(items).map((key) => {
        const item = items[key];

        return (
          <ListItem key={key}
                    disabled={item.id === playlist.id}
                    primaryText={item.title}
                    onClick={() => onItemClick(item)}
            />
        );
      });
    }

    return (
      <List className="albums" subheader="Albums">
        {content}
      </List>
    );
  }
}
