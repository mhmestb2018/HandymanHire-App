import React, { Component } from "react";
import { List, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";

class WorkListProposals extends Component {
  render() {
    const {interested}= this.props;
    return (
      <List.Item>
        <Image as={Link} to={`/profile/${interested.id}`} size='mini' circular src={interested.photoURL}/>
      </List.Item>
    );
  }
}
export default WorkListProposals;
