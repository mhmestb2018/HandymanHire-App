import React from "react";
import {
  Form,
  Input,
  TextArea,
  Button,
  Container,
  Image,
  Grid,
  Segment,
  Message,
  Header
} from "semantic-ui-react";
import { Link } from "react-router-dom";
// import contactFormSubmit from "../../common/utill/contactForm";

const ContactForm = () => {
  return (
    <Segment clearing>
      <Header as="h1" textAlign="center" size="huge">
        Contact Us
      </Header>
      <Grid columns={2} stackable>
        <Grid.Column>
          <Image src="/assets/mail.jpg" size="medium" />
        </Grid.Column>
        <Grid.Column>
          <form
            action="https://formspree.io/A_lesica@outlook.com"
            method="POST"
            id="contactForm"
          >
            <Header as="h3">
              Any problems, got a question, We'd love to hear from you. Send us
              a message and we'll respond as soon as possible.
            </Header>
            <input id="name" type="text" name="name" placeholder="Your name" />
            <input
              id="email"
              type="email"
              name="_replyto"
              placeholder="Email address"
            />
            <textarea name="message" type="text" placeholder="Message" />
            <button type="submit" class='buttonForm'>Submit</button>
          </form>
        </Grid.Column>
      </Grid>
    </Segment>
  );
};
export default ContactForm;
