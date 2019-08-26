import React from "react";
import { Link, withRouter } from "react-router-dom";
import {
  Button,
  Container,
  Grid,
  Header,
  Icon,
  Image,
  Responsive,
  Card,
  Segment
} from "semantic-ui-react";
import Footer from "../nav/Footer";
import ScrollUpButton from "react-scroll-up-button";
import NavBar from "../nav/NavBar/NavBar";

const HomepageHeading = () => (
  <Segment>
    <Grid stackable>
      <Grid.Column width={8}>
        <Image src="/assets/HomePageImage.png" alt="logo" />
      </Grid.Column>
      <Grid.Column width={8} textAlign="center" verticalAlign="middle">
        <Responsive />
        <Header
          as="h2"
          content="From cleaning to renovation to fixing and home installations, find professionals, and negotiate the best price"
        />
        <Button
          as={Link}
          to="/jobs"
          basic
          color="black"
          style={{ margin: "2em" }}
        >
          Get started
          <Icon name="right arrow" />
        </Button>
      </Grid.Column>
    </Grid>
  </Segment>
);
const HomePage = () => (
  <Container style={{ marginTop: "1em" }}>
    <NavBar />
    <HomepageHeading />
    <Segment>
      <Grid stackable>
        <Grid.Row>
          <Grid.Column width={8}>
            <Header as="h2" style={{ fontSize: "2em" }}>
              We connect Homeowner and Handyman
            </Header>
            <p style={{ fontSize: "1.33em" }}>
              We are providing simple and free connection platform for
              homeowners and home professionals in Ireland. Getting someone to
              help out around the home has never been easier. if you are
              homeowner our app helps you to find qualified handyman or get
              specialized advise. If you are handyman you can find job or help
              by sharing your knowledge and skills with others.
            </p>
          </Grid.Column>

          <Grid.Column floated="right" width={8}>
            <Image
              bordered
              rounded
              size="large"
              src="/assets/Ireland.jpg"
              alt="Ireland"
            />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>
    <Segment>
      <Card.Group centered>
        <Card>
          <Card.Content>
            <Icon name="envelope open outline" size="huge" />
            <Card.Meta>Homeowner</Card.Meta>
            <Card.Description>
              {" "}
              You can easily create your profile, post a job and wait for a
              response from home professionals. You can chat and decide who is
              the best qualified for your job.{" "}
            </Card.Description>
          </Card.Content>
        </Card>

        <Card>
          <Card.Content>
            <Icon name="add user" size="huge" />
            <Card.Meta content="Handyman" />
            <Card.Description content="You can easily create your profile, and if you find the job offer you can inform the homeowner that you are ready to take up a job by adding yourself into the project as interested." />
          </Card.Content>
        </Card>

        <Card>
          <Card.Content>
            <Icon name="handshake outline" size="huge" />
            <Card.Meta content="Agreement" />
            <Card.Description content="Negotiate contract terms and hire a handyman for your job" />
          </Card.Content>
        </Card>
      </Card.Group>
    </Segment>
    <ScrollUpButton />

    <Footer />
  </Container>
);
export default withRouter(HomePage);
