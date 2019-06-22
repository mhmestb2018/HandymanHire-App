import React, { Component } from "react";
import { Segment, Item, Icon, List, Button } from "semantic-ui-react";
import WorkListProposals from "./WorkListProposals";
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
                <Item.Header as="a">{job.title}</Item.Header>
                <Item.Description>
                  Ordered by <a>{job.orderedBy}</a>
                </Item.Description>
              </Item.Content>
            </Item>
          </Item.Group>
        </Segment>
        <Segment>
          <span>
            <Icon name="clock" />
            {job.date} |
            <Icon name="marker" /> {job.address}
          </span>
        </Segment>

        <Segment clearing>
          <span>{job.description}</span>
          <div>
            <Button as="a" color="teal" floated="right" content="View" />
          </div>
        </Segment>

        <Segment secondary>
          <div>
            <Item.Header as="a">People interesting in the project</Item.Header>
          </div>
          <List horizontal>
            {job.proposals.map(proposal => (
              <WorkListProposals key={proposal.id} proposal={proposal} />
            ))}
          </List>
        </Segment>
      </Segment.Group>
    );
  }
}
export default WorkListItem;
