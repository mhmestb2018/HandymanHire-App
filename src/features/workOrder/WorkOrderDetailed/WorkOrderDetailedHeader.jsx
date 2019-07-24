import React, { Fragment } from "react";
import { Segment, Image, Item, Header, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { format } from "date-fns";

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
const WorkOrderDetailedHeader = ({
  job,
  isInterested,
  isHandyman,
  jobProposal,
  cancelJobProposal
}) => {
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
                <p>{job.date && format(job.date.toDate(), "EEEE do LLLL")}</p>
                <p>
                  Ordered by{" "}
                  <strong>
                    <Link to={`/profile/${job.orderedByUid}`}>
                      {job.orderedBy}
                    </Link>
                  </strong>
                </p>
              </Item.Content>
            </Item>
          </Item.Group>
        </Segment>
      </Segment>

      <Segment attached="bottom" clearing>
        {isHandyman && (
          <Fragment>
            {isInterested ? (
              <Button onClick={() => cancelJobProposal(job)}>
                Cancel My Enquiry proposal
              </Button>
            ) : (
              <Button onClick={() => jobProposal(job)} color="green">
                Put An Offer
              </Button>
            )}
          </Fragment>
        )}
        {isHandyman && (
          <Button
            as={Link}
            to={`/manage/${job.id}`}
            color="green"
            floated="right"
          >
            Manage Offer
          </Button>
        )}
      </Segment>
    </Segment.Group>
  );
};

export default WorkOrderDetailedHeader;
