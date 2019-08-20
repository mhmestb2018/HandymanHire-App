import React, { Component } from "react";
import {
  Segment,
  Item,
  Icon,
  List,
  Button,
  Label,
  Header,
  Image
} from "semantic-ui-react";
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
          <Header
            as="h3"
            style={{ textTransform: "uppercase", wordSpacing: "0.6em" }}
            block
            textAlign="center"
          >
            {job.category}
          </Header>
          <Item.Group>
            <Item>
              <Image avatar size="tiny" circular src={job.orderedByPhotoURL} />

              <Item.Content>
                <Item.Header as={Link} to={`/jobs/${job.id}`}>
                  {job.title}
                </Item.Header>
                <Item.Description>
                  Posted by {"  "}
                  <Link to={`/profile/${job.orderedByUid}`}>
                    {job.orderedBy}
                  </Link>
                </Item.Description>
                {job.cancelled && (
                  <Label
                    style={{ margin: "0.6em" }}
                    ribbon="right"
                    size='large'
                    color="red"
                    content="Job cancelled"
                  />
                )}
            

              </Item.Content>
            </Item>
          </Item.Group>
        </Segment>
        <Segment clearing>
          <div>
            <Button
              as={Link}
              to={`/jobs/${job.id}`}
              basic
              color="black"
              content="More details"
              attached="bottom"
            />
          </div>
        </Segment>
        <Segment clearing>
        {job.date.toDate() < Date.now() && (
                  <Label
                    style={{ margin: "0em" }}
                    ribbon="right"
                    color="red"
                  
                    size='large'>  Job expired on {format(job.date.toDate(), "EEEE do LLL yyyy")}</Label>
                
                )}
          <Header as="h5">
            <Icon name="clock" />
            Posted on {format(job.created.toDate(), "EEEE do LLL yyyy")}{" "}
            {/* {format(job.created.toDate(), "h:mm a")} */}
            
          </Header>
       
          <Header as="h5">
            <Icon name="marker" /> Job location {job.city}
          </Header>
          
        </Segment>

        <Segment secondary>
          <Item.Header as="h5">Interested in the job</Item.Header>
          <List horizontal>
            {job.InterestedInJobs &&
              job &&
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
