import React, { Component } from 'react';
import { CircularProgress, List, ListItem } from 'material-ui';

export default class Albums extends Component {

  render() {
    const { albums, playlist } = this.props;
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
          <ListItem
            disabled={item.id === playlist.id}
            primaryText={item.title}
            key={key}
            onClick={() => this.handleItemClick(item)}
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

  handleItemClick(item) {
    this.props.onItemClick(item);
  }

}
