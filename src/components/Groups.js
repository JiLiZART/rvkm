import React, { Component } from 'react';
import { CircularProgress, Avatar, List, ListItem } from 'material-ui';

export default class Groups extends Component {
  render() {
    const { groups, onItemClick } = this.props;
    const { fetching, error, items } = groups.toJS();

    let content;

    if (fetching) {
      content = (<CircularProgress mode="indeterminate" size={1.5}/>);
    }

    if (error) {
      content = 'Error loading groups';
    }

    if (!error && !fetching) {
      content = Object.keys(items).map((key) => {
        const item = items[key];
        const avatar = (<Avatar src={item.avatar}/>);

        return (<ListItem key={key}
                          leftAvatar={avatar}
                          primaryText={item.title}
                          onClick={() => onItemClick(item)}
          />);
      });
    }

    return (
      <List className="groups" subheader="Groups">{content}</List>
    );
  }
}
