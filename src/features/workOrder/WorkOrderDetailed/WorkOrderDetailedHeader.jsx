import React from "react";
import { Segment, Image, Item, Header, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";
const imageStyle = {
  // filter: "brightness(80%)"
  background: "white",
  height: "18em",
  width: "20em"
};

const imageTextStyle = {
  position: "absolute",
  bottom: "5%",
  left: "5%",
  width: "100%",
  height: "auto"

  // color: 'white'
};
const WorkOrderDetailedHeader = ({ job }) => {
  return (
    <Segment.Group style={{ background: "white" }}>
      <Segment basic attached="top" style={{ padding: "0" }}>
        <Image
          src={`/assets/categoryImages/${job.category}.jpg`}
          size="medium"
          style={imageStyle}
          centered
        />

        <Segment basic style={imageTextStyle}>
          <Item.Group>
            <Item>
              <Item.Content>
                <Header
                  size="huge"
                  content={job.title}
                  //  style={{ color: 'Blue' }}
                />
                <p>{job.date}</p>
                <p>
                  Ordered by <strong>{job.orderedBy}</strong>
                </p>
              </Item.Content>
            </Item>
          </Item.Group>
        </Segment>
      </Segment>

      <Segment attached="bottom">
        <Button>Cancel My Offer</Button>
        <Button color="green">Put An Offer</Button>

        <Button as={Link} to={`/manage/${job.id}`} color="green" floated="right">
          Manage Offer
        </Button>
      </Segment>
    </Segment.Group>
  );
};

export default WorkOrderDetailedHeader;
