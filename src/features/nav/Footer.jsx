import React from "react";
import {
  Container,
  Divider,
  Image,
  List,
  Segment,
  Header
} from "semantic-ui-react";

const Footer = () => (
  <Segment textAlign="center">
    <Container textAlign="center">
      <Image centered size="tiny" src="assets/favicon.png" />
      <List horizontal divided link size="small">
        <List.Item as="a" href="/sitemap">
          Site Map
        </List.Item>
        <List.Item as="a" href="/contact">
          Contact Us
        </List.Item>
        <List.Item as="a" href="/termsConditions">
          Terms and Conditions
        </List.Item>
        <List.Item as="a" href="/privacyPolicy">
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
);
export default Footer;
