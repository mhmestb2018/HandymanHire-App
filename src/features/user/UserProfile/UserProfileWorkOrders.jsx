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
  { menuItem: "All Enquiries", pane: { key: "allEnquiries" } },
  { menuItem: "Past Enquiries", pane: { key: "pastEnquiries" } },
  { menuItem: "Future Enquiries", pane: { key: "futurEnquiries" } },
  { menuItem: "My Enquiries", pane: { key: "MyEnquiries" } }
];

const UserProfileWorkOrders = ({
  workOrders,
  workOrdersLoading,
  changeTab
}) => (
  <Grid.Column width={12}>
    <Segment attached loading={workOrdersLoading}>
      <Header icon="calendar" content="Enquiries" />
      <Tab
        onTabChange={(e, data) => changeTab(e, data)}
        panes={panes}
        menu={{ secondary: true, pointing: true }}
      />
      <br />

      <Card.Group itemsPerRow={5}>
        {workOrders &&
          workOrders.map(job => (
            <Card as={Link} to={`/jobs/${job.id}`} key={job.id}>
              <Image src={`/assets/categoryImages/${job.category}.jpg`} />
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
