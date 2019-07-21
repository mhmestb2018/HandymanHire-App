import React from "react";
import { Grid, Header, Menu, Segment, Card, Image } from "semantic-ui-react";

const UserProfileWorkOrders = () => {
  return (
    <Grid.Column width={12}>
      <Segment attached>
        <Header icon="calendar" content="Work Orders" />
        <Menu secondary pointing>
          <Menu.Item name="ALl Work Orders" active />
          <Menu.Item name="My Handyman jobs" />
          <Menu.Item name="Hired handyman jobs" active />
        </Menu>
        <Card.Group itemsPerRow={5}>
          <Card>
            <Image src={"/assets/categoryImages/logoWebHH.png"} />
            <Card.Content>
              <Card.Header textAlign="center">Work Order Title</Card.Header>
              <Card.Meta textAlign="center">22th April 2020 at 20 PM</Card.Meta>
            </Card.Content>
          </Card>
        </Card.Group>
      </Segment>
    </Grid.Column>
  );
};
export default UserProfileWorkOrders;
