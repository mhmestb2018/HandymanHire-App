import React, { Component } from "react";
import { List, Image, Segment, Grid } from "semantic-ui-react";
import { Link } from "react-router-dom";

class WorkListProposals extends Component {
  render() {
    const { interested } = this.props;
    return (
      <List.Item>
        {interested.handyman && (
          <Grid stackable>
            <Grid.Column>
              <Segment>
                <Image
                  as={Link}
                  to={`/profile/${interested.id}`}
                  size="mini"
                  circular
                  src={interested.photoURL}
                  centered
                />
                <p>{interested.displayName}</p>
              </Segment>
            </Grid.Column>
          </Grid>
        )}
      </List.Item>
    );
  }
}
export default WorkListProposals;
