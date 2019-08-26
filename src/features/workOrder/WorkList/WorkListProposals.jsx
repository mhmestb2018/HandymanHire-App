import React, { Component } from "react";
import { List, Image, Popup } from "semantic-ui-react";
import { Link } from "react-router-dom";

class WorkListProposals extends Component {
  render() {
    const { interested } = this.props;
    return (
      <List.Item>
        {interested.handyman && (
          <Popup
            trigger={
              <Image
                as={Link}
                to={`/profile/${interested.id}`}
                size="mini"
                circular
                src={interested.photoURL}
                alt={interested.name}
                centered
              />
            }
            basic
          >
            {interested.displayName}
          </Popup>
        )}
      </List.Item>
    );
  }
}
export default WorkListProposals;
