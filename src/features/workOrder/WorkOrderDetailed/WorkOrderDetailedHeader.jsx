import React, { Fragment } from "react";
import { Segment, Image, Item, Header, Button, Popup } from "semantic-ui-react";
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
  loading,
  isInterested,
  isHire,
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
                <p>
                  Posted on{" "}
                  {job.created && format(job.date.toDate(), "EEEE do LLLL")}
                </p>
                <p>
                  Posted by{" "}
                  <Link to={`/profile/${job.orderedByUid}`}>
                    {job.orderedBy}
                  </Link>
                </p>
                <Item.Extra>job id : {job.id}</Item.Extra>
              </Item.Content>
             
            </Item>
          </Item.Group>
        </Segment>
      </Segment>

      <Segment attached="bottom" clearing>
        {!isHire && (
          <Fragment>
            {isInterested ? (
              <Button onClick={() => cancelJobProposal(job)}>
                Discard from interested
              </Button>
            ) : (
              <Popup
                content="By clicking  this button you are informing homeowner that you are qualified for this job, and you want him/her to contact you."
                trigger={
                  <Button
                    loading={loading}
                    onClick={() => jobProposal(job)}
                    color="green"
                  >
                    Add to interested
                  </Button>
                }
              />
            )}
          </Fragment>
        )}
        {isHire && (
          <Button
            as={Link}
            to={`/manage/${job.id}`}
            color="green"
            floated="right"
          >
            Manage job
          </Button>
        )}
      </Segment>
    </Segment.Group>
  );
};

export default WorkOrderDetailedHeader;
