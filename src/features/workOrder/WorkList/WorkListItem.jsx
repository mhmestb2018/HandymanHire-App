import React, { Component } from "react";
import { Segment, Item, Icon, List, Button } from "semantic-ui-react";
import WorkListProposals from "./WorkListProposals";
class WorkListItem extends Component {
  render() {
    const { job, selectJob, deleteJob } = this.props;
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
              onClick={() => selectJob(job)}
              as="a"
              color="teal"
              floated="right"
              content="View"
            />
            <Button
              onClick={() => deleteJob(job.id)}
              as="a"
              color="red"
              floated="right"
              content="delete"
            />
          </div>
        </Segment>
        <Segment>
          <span>
            <Icon name="clock" />
            {job.date} |
            <Icon name="marker" /> {job.city}
          </span>
        </Segment>
        <Segment secondary>
          <div>
            <Item.Header as="a">People interesting in the project</Item.Header>
          </div>
          <List horizontal>
            {job.proposal &&
              job.proposals.map(proposal => (
                <WorkListProposals key={proposal.id} proposal={proposal} />
              ))}
          </List>
        </Segment>
      </Segment.Group>
    );
  }
}
export default WorkListItem;
