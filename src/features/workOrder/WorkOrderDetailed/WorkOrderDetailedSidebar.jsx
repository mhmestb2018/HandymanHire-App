import React, { Fragment } from "react";
import { Segment, Item, Label, List, Image, Rating } from "semantic-ui-react";
import { Link } from "react-router-dom";

const WorkOrderDetailedSidebar = ({ InterestedInJobs, job }) => {
  const isHire = false;
  return (
    <Fragment>
      <Segment
        textAlign="center"
        style={{ border: "none" }}
        attached="top"
        secondary
        inverted
        color="blue"
      >
        Members interested in the job
      </Segment>
      <Segment attached>
        <List relaxed divided>
          {InterestedInJobs &&
            InterestedInJobs.map(interested => (
              <Item key={interested.id} style={{ position: "relative" }}>
                {isHire}
                <Label
                  style={{ position: "absolute" }}
                  color="orange"
                  ribbon="right"
                >
                  <Rating  defaultRating={3} maxRating={5} icon='star' disabled />
                  {/* <Icon name="star outline" />
                  <Icon name="star outline" />
                  <Icon name="star outline" /> */}
                </Label>
                <Image size="tiny" src={interested.photoURL} />

                <Item.Content verticalAlign="middle">
                  <Item.Header as="h3">
                    <Link to={`/profile/${interested.id}`}>
                      {interested.displayName}
                    </Link>
                  </Item.Header>
                </Item.Content>
              </Item>
            ))}
        </List>
      </Segment>
    </Fragment>
  );
};

export default WorkOrderDetailedSidebar;
