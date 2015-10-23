import React, { Component } from 'react';
import { CircularProgress, Avatar, List, ListItem } from 'material-ui';

export default class Friends extends Component {
  render() {
    const { friends } = this.props;
    const { fetching, error, items } = friends.toJS();

    let content;

    if (fetching) {
      content = (<CircularProgress mode="indeterminate" size={1.5}/>);
    }

    if (error) {
      content = 'Error loading friends';
    }

    if (!error && !fetching) {
      content = Object.keys(items).map((key) => {
        const item = items[key];
        const url = '#/friends/' + item.id;

        return (<ListItem key={key}
                          leftAvatar={<Avatar src={item.avatar} />}
                          primaryText={item.title}
                          href={url}
          />);
      });
    }

    return (
      <List className="friends" subheader="Friends">
        {content}
      </List>
    );
  }
}
