import React from "react";
import { Segment, Button, Image } from "semantic-ui-react";
import { withRouter } from "react-router";

const NotFound = ({ history }) => {
  return (
    <Segment placeholder>
      <Image centered size="big" src="/assets/page-not-found.jpg" />

      <Segment.Inline>
        <Button onClick={() => history.push("/jobs")} primary>
          Return to jobs page
        </Button>
      </Segment.Inline>
    </Segment>
  );
};

export default withRouter(NotFound);
