import React from "react";
import {
  Container,
  Divider,
  Image,
  List,
  Segment,
  Header,
  Responsive
} from "semantic-ui-react";

const Footer = () => (
  <Segment textAlign="center">
    <Container textAlign="center">
      <Image
        centered
        size="tiny"
        src="https://firebasestorage.googleapis.com/v0/b/handymanhire-fccd5.appspot.com/o/gsHKvFPUOFd22WKdqhwwTfoLe9M2%2Fweb_images%2Ffavicon.png?alt=media&token=a07a60d7-53ee-4790-b01b-bfbe58533aa9"
        alt="HandymanHire"
      />
      <Responsive minWidth={768}>
        <List horizontal divided link size="large">
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
      </Responsive>
    </Container>
    <Divider />
    <Header
      as="a"
      href="https://arkadiuszlesica.com/"
      content="Copyright © 2019  HandymanHire.ie"
      size="tiny"
      textAlign="center"
    />
  </Segment>
);
export default Footer;
