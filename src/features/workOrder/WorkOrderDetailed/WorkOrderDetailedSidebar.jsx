import React, { Fragment } from "react";
import {
  Segment,
  Item,
  List,
  Image,
  Label,
  Header,
  Icon
} from "semantic-ui-react";
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
        Interested in the job
      </Segment>
      <Segment >
        <List relaxed divided>
          {/* {InterestedInJobs && (
            <Segment>
              <Icon name="users" size="big" textAlign="center" />
              <p>No one interested yet</p>
            </Segment>
          )} */}
          {InterestedInJobs &&
            InterestedInJobs.map(interested => (
              <Item key={interested.id} style={{ position: "relative" }}>
                {/* <Label
                  style={{ position: "absolute" }}
                  color="orange"
                  ribbon="right"
                >
                  <Header
                    as="h5"
                    content="Homeowner"
                    style={{ color: "white" }}
                  /> */}
                {/* <Icon name="star outline" />
                  <Icon name="star outline" />
                  <Icon name="star outline" /> */}
                {/* </Label> */}
                {interested.handyman && (
                  <Fragment>
                    <Image size="tiny" src={interested.photoURL} />

                    <Item.Content >
                      <Item.Header as="h3">
                        <Link to={`/profile/${interested.id}`}>
                          {interested.displayName}
                        </Link>
                      </Item.Header>
                    </Item.Content>
                  </Fragment>
                )}
              </Item>
            ))}
        </List>
      </Segment>
    </Fragment>
  );
};

export default WorkOrderDetailedSidebar;
