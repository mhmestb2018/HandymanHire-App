import React, { Component } from "react";
import { List, Image } from "semantic-ui-react";

class WorkListProposals extends Component {
  render() {
    const {proposal}= this.props;
    return (
      <List.Item>
        <Image as='a' size='mini' circular src={proposal.photoURL}/>
      </List.Item>
    );
  }
}
export default WorkListProposals;
