import React, { Component } from "react";
import { Segment, Item, Icon, List, Button, Label } from "semantic-ui-react";
import WorkListProposals from "./WorkListProposals";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { objectToArray } from "../../../app/common/utill/helpers";
class WorkListItem extends Component {
  render() {
    const { job } = this.props;
    return (
      <Segment.Group>
        <Segment>
          <Item.Group>
            <Item>
              <Item.Image size="tiny" circular src={job.photoURL} />
              <Item.Content>
                <Item.Header as={Link} to={`/workOrders/${job.id}`}>
                  {job.title}
                </Item.Header>
                <Item.Description>
                  Ordered By {"  "}
                  <Link to={`/profile/${job.orderedByUid}`}>
                    {job.orderedBy}
                  </Link>
                </Item.Description>
                {job.cancelled && (
                  <Label
                    style={{ top: "-40px" }}
                    ribbon="right"
                    color="red"
                    content="This enquiry has been cancelled"
                  />
                )}
              </Item.Content>
            </Item>
          </Item.Group>
        </Segment>
        <Segment clearing>
          <span>{job.description}</span>
          <div>
            <Button
              as={Link}
              to={`/jobs/${job.id}`}
              color="teal"
              floated="right"
              content="View"
            />
          </div>
        </Segment>
        <Segment>
          <span>
            <Icon name="clock" />
            {format(job.date.toDate(), "EEEE do LLL yyyy")}
            at{""}
            {format(job.date.toDate(), "h:mm a")}
            <Icon name="marker" /> {job.city}
          </span>
        </Segment>

        <Segment secondary>
          <div>
            <Item.Header as="a">Interested in doing the job</Item.Header>
          </div>
          <List horizontal>
            {job.InterestedInJobs &&
              objectToArray(job.InterestedInJobs).map(interested => (
                <WorkListProposals
                  key={interested.id}
                  interested={interested}
                />
              ))}
          </List>
        </Segment>
      </Segment.Group>
    );
  }
}
export default WorkListItem;
