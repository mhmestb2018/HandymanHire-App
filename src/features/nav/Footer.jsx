import React from "react";
import {
  Container,
  Divider,
  Dropdown,
  Grid,
  Header,
  Image,
  List,
  Menu,
  Segment
} from "semantic-ui-react";
import { Link } from "react-router-dom";

const Footer = () => (
  <div>
    <Segment textAlign="center">
      <Container textAlign="center">
        <Image centered size="tiny" src="assets/favicon.png" />
        <List horizontal divided link size="small">
          <List.Item  as="a" href="/sitemap">
            Site Map
          </List.Item>
          <List.Item as="a" href="/contact">
            Contact Us
          </List.Item>
          <List.Item as="a" href="/termsConditions">
            Terms and Conditions
          </List.Item>
          <List.Item as='a' href="/privacyPolicy" >
            Privacy Policy
          </List.Item>
        </List>
      </Container>
      <Divider />
      <Header
        as="a"
        href="https://arkadiuszlesica.com/"
        content="Copyright © 2019   HandymanHire.ie"
        size="tiny"
        textAlign="center"
      />
    </Segment>
  </div>
);
export default Footer;
