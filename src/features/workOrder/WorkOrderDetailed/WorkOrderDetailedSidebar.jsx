import React, { Fragment } from "react";
import { Segment, Item, Label, List, Image } from "semantic-ui-react";

const WorkOrderDetailedSidebar = ({ proposals }) => {
  const isOrderedBy = false;
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
        {proposals && proposals.lenght}
        {proposals && proposals.lenght === 1
          ? "Contractor"
          : "Contractors"}{" "}
        Interesting in the job
      </Segment>
      <Segment attached>
        <List relaxed divided>
          {proposals &&
            proposals.map(proposal => (
              <Item key={proposal.id} style={{ position: "relative" }}>
                {isOrderedBy}
                <Label
                  style={{ position: "absolute" }}
                  color="orange"
                  ribbon="right"
                >
                  Customer (Ordered by)
                </Label>
                <Image size="tiny" src={proposal.photoURL} />

                <Item.Content verticalAlign="middle">
                  <Item.Header as="h3">{proposal.name}</Item.Header>
                </Item.Content>
              </Item>
            ))}
        </List>
      </Segment>
    </Fragment>
  );
};

export default WorkOrderDetailedSidebar;
