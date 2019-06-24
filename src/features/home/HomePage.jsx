import React from "react";
import {
  Header,
  Container,
  Segment,
  Image,
  Button,
  Icon
} from "semantic-ui-react";
const HomePage = ({ history }) => {
  return (
    <Segment inverted textAlign="center" vertical className="masthead">
      <Container text>
        <Image
          size="large"
          src="/assets/logo.png"
          alt="logo"
          style={{ margin: 110 }}
        />
        <Header as="h2" inverted>
          FIND TOP-RATED, CERTIFIED PROS FOR YOUR PROJECT
        </Header>
        <Button onClick={() => history.push("/jobs")} size="huge" inverted>
          Get started
          <Icon name="right arrow" inverted />
        </Button>
      </Container>
    </Segment>
  );
};

export default HomePage;
