import React from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Container,
  Divider,
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
import Sitemap from "./Sitemap";

const HomepageHeading = ({ mobile, history }) => (
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
  <Container>
    <NavBar />
    <HomepageHeading />
    <Segment>
      <Grid stackable>
        <Grid.Row>
          <Grid.Column width={8}>
            <Header as="h2" style={{ fontSize: "2em" }}>
              We connect homeowner and handyman
            </Header>
            <p style={{ fontSize: "1.33em" }}>
              We are providing simple and easy advertisement platform for
              homeowners and contractors in Ireland. Getting a handyman to help
              out around the home has never been easier. Our apps connects
              handyman with customers who can then set up and arrange services.
            </p>
            <Button inverted color="blue" floated="right">
              Read More
            </Button>
          </Grid.Column>

          <Grid.Column floated="right" width={8}>
            <Image bordered rounded size="big" src="/assets/Ireland.jpg" />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>
    <Segment>
      <Card.Group>
        <Card>
          <Card.Content>
            <Icon name="envelope open outline" size="huge" />
            <Card.Meta>Homeowner</Card.Meta>
            <Card.Description>
              {" "}
              you can easily post a job and wait for a response from
              contractors. You can chat and decide who is right for your job.{" "}
            </Card.Description>
          </Card.Content>
        </Card>

        <Card>
          <Card.Content>
            <Icon name="add user" size="huge" />
            <Card.Meta content="Handyman" />
            <Card.Description content=" you can easily create your profile, and if you find suitaible job offer, just add yourself into the project as interested." />
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
export default HomePage;
