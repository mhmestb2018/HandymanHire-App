import React, { Component } from "react";
import { Segment, Item, Icon, List, Button } from "semantic-ui-react";
import WorkListProposals from "./WorkListProposals";
import { Link } from "react-router-dom";
import { format } from "date-fns";
class WorkListItem extends Component {
  render() {
    const { job, deleteJob } = this.props;
    return (
      <Segment.Group>
        <Segment>
          <Item.Group>
            <Item>
              <Item.Image size="tiny" circular src={job.photoURL} />
              <Item.Content>
                <Item.Header>{job.title}</Item.Header>
                <Item.Description>Ordered by {job.orderedBy}</Item.Description>
              </Item.Content>
            </Item>
          </Item.Group>
        </Segment>
        <Segment clearing>
          <span>{job.description}</span>
          <div>
            <Button
              onClick={() => deleteJob(job.id)}
              as="a"
              color="red"
              floated="right"
              content="delete"
            />
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
            <Item.Header as="a">People interesting in the project</Item.Header>
          </div>
          <List horizontal>
            {job.proposals &&
              Object.values(job.proposals).map((proposal,index) => (
                <WorkListProposals key={index} proposal={proposal} />
              ))}
          </List>
        </Segment>
      </Segment.Group>
    );
  }
}
export default WorkListItem;
