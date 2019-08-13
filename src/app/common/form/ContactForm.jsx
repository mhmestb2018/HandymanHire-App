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
    <Segment>
      <Header as="h1" textAlign="center" size="huge">
        Contact Us
      </Header>
      <Grid columns={2} stackable>
        <Grid.Column>
          <Image src="/assets/mail.jpg" size="medium" />
        </Grid.Column>
        <Grid.Column>
          <Form id="contactForm">
            <Header as="h3">
              Any problems, got a question, We'd love to hear from you. Send us
              a message and we'll respond as soon as possible.
            </Header>
            <Form.Group widths="equal">
              <Form.Field
                id="form-input-control-name"
                control={Input}
                placeholder="Your name"
              />
              <Form.Field
                id="form-input-control-email"
                control={Input}
                placeholder="Email address"
              />
            </Form.Group>
            <Form.Field
              id="form-textarea-control-message"
              control={TextArea}
              placeholder="Message"
              style={{ minHeight: 150 }}
            />
            <Form.Field>
              <Button
                id="form-button-control-public"
                attached="bottom"
                content="Submit"
                basic
                color="black"
                type="submit"
              />
            </Form.Field>
          </Form>
        </Grid.Column>
      </Grid>
    </Segment>
  );
};
export default ContactForm;
