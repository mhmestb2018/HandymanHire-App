import React from "react";
import {
  Grid,
  Header,
  Menu,
  Segment,
  Card,
  Image,
  Tab
} from "semantic-ui-react";
import { Link } from "react-router-dom";
import format from "date-fns/format";

// Tabs for different events on user profile
const panes = [
  { menuItem: "All interested jobs", pane: { key: "allInterestedJobs" } },
  { menuItem: "Past interested jobs", pane: { key: "pastInterestedJobs" } },
  { menuItem: "Recent interested jobs", pane: { key: "recentInterestedJobs" } },
  { menuItem: "My posted jobs", pane: { key: "myPostedJobs" } }
];

const UserProfileWorkOrders = ({
  workOrders,
  workOrdersLoading,
  changeTab
}) => (
  <Grid.Column width={12} stackable="true">
    <Segment attached loading={workOrdersLoading}>
      <Header icon="calendar alternate outline" content="My jobs activity" />
      <Tab
        onTabChange={(e, data) => changeTab(e, data)}
        panes={panes}
        menu={{ attached: false, tabular: false, stackable: true }}
      />
      <br />
      <Card.Group itemsPerRow={6} stackable>
        {workOrders &&
          workOrders.map(job => (
            <Card as={Link} to={`/jobs/${job.id}`} key={job.id} size="tiny">
              <Image
                src={`/assets/categoryImages/${job.category}.jpg`}
                size="tiny"
                centered
              />
              <Card.Content>
                <Card.Header textAlign="center">{job.title}</Card.Header>
                <Card.Meta textAlign="center">
                  <div>
                    {format(job.date && job.date.toDate(), "dd LLL yyyy")}{" "}
                  </div>
                  <div>{format(job.date && job.date.toDate(), "h:mm a")}</div>
                </Card.Meta>
              </Card.Content>
            </Card>
          ))}
      </Card.Group>
    </Segment>
  </Grid.Column>
);

export default UserProfileWorkOrders;
