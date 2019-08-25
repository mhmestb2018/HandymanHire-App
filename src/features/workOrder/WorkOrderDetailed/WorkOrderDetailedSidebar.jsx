import React, { Fragment } from "react";
import { Segment, Item, List, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";

const WorkOrderDetailedSidebar = ({ InterestedInJobs, job }) => {
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
      <Segment>
        <List animated verticalAlign="middle">
          {InterestedInJobs &&
            InterestedInJobs.map(interested => (
              <List.Item key={interested.id} style={{ position: "relative" }}>
                {interested.handyman && (
                  <Fragment>
                    <Image
                      avatar
                      size="tiny"
                      src={interested.photoURL}
                      style={{ width: "5em" }}
                    />
                    <Item.Content>
                      <Item.Header as="h3">
                        <Link to={`/profile/${interested.id}`}>
                          {interested.displayName}
                        </Link>
                      </Item.Header>
                    </Item.Content>
                  </Fragment>
                )}
              </List.Item>
            ))}
        </List>
      </Segment>
    </Fragment>
  );
};

export default WorkOrderDetailedSidebar;
