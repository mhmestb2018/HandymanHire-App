import React, { Fragment } from "react";
import { Segment, Item, Label, List, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";

const WorkOrderDetailedSidebar = ({ interested }) => {
  const isHandyman = false;
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
        {/* {InterestedInJobs && InterestedInJobs.lenght}
        {InterestedInJobs && InterestedInJobs.lenght === 1
          ? "Contractor"
          : "Contractors"}{" "} */}
        Interested in the job
      </Segment>
      <Segment attached>
        <List relaxed divided>
          {interested &&
            interested.map(interested => (
              <Item key={interested.id} style={{ position: "relative" }}>
                {isHandyman}
                <Label
                  style={{ position: "absolute" }}
                  color="orange"
                  ribbon="right"
                >
                  Customer (Ordered by)
                </Label>
                <Image size="tiny" src={interested.photoURL} />

                <Item.Content verticalAlign="middle">
                  <Item.Header as="h3">
                    <Link to={`/profile/${interested.displayName}`}>
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
