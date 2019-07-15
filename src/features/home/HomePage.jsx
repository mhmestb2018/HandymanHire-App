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
    // <Grid centered vertical textAlign="center" className="masthead">
    //   <Grid.Column width={4}>
    //     <Image
    //       src="/assets/categoryImages/logo2.png"
    //       alt="logo"
    //       style={{ margin: 110 }}

    //     />
    //   </Grid.Column>

    //   <Grid.Column centered width={8} textAlign="center">
    //     <Header as="h3" style={{ margin: 190 }} inverted>
    //       FIND TOP-RATED, CERTIFIED PROS FOR YOUR PROJECT
    //     </Header>

    //     <Button onClick={() => history.push("/jobs")} size="huge" inverted>
    //       Get started
    //       <Icon name="right arrow" inverted
    //       />
    //     </Button>
    //   </Grid.Column>
    // </Grid>

    <Segment inverted textAlign="center" vertical className="masthead">
      <Container text>
        <Image size="big" src="/assets/logoHHTools.png" alt="logo" />
        <Header
          as="h2"
          inverted
          content="FIND TOP-RATED, CERTIFIED PROS FOR YOUR PROJECT"
        />

        <Button onClick={() => history.push("/jobs")} size="huge" inverted>
          Get started
          <Icon name="right arrow" inverted />
        </Button>
      </Container>
    </Segment>
  );
};

export default HomePage;
