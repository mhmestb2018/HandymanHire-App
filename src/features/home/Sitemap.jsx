import React, { Component } from "react";
import { Button, Header, Segment, Image, Card } from "semantic-ui-react";

class Sitemap extends Component {
  state = { open: false };

  handleOpen = () => this.setState({ open: true });

  handleClose = () => this.setState({ open: false });

  render() {
    return (
      <Segment textAlign="center">
        <Header as="h1" content="Sitemap Under Construction" />
        <Image
          src="/assets/categoryImages/BlockLayer.jpg"
          alt="sitemap"
          size="large"
          style={{ margin: "0em 17em" }}
        />
      </Segment>
    );
  }
}
export default Sitemap;
