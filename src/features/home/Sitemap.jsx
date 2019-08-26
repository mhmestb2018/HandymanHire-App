import React, { Component } from "react";
import { Header, Segment, Image } from "semantic-ui-react";

class Sitemap extends Component {
  render() {
    return (
      <Segment textAlign="center">
        <Header as="h1" content="Sitemap Under Construction" />
        <Image
          src="/assets/categoryImages/BlockLayer.jpg"
          size="large"
          alt="Under construction"
          style={{ margin: "0em 17em" }}
        />
      </Segment>
    );
  }
}
export default Sitemap;
