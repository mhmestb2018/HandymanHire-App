import React, { Component, Fragment } from "react";
import {
  Form,
  Button,
  Label,
  Input,
  Divider,
  Modal,
  Icon,
  Confirm
} from "semantic-ui-react";
import { getFirebase } from "react-redux-firebase";
import { withRouter } from "react-router";
import EmailValidator from "email-validator";

class ForgotPassword extends Component {
  open = () => this.setState({ open: true });
  close = () => this.setState({ open: false });

  handleCloseModal = () => {
    this.props.history.goBack();
    this.props.closeModal();
  };
  state = { username: "", open: false };
  forgotPassword = yourEmail => {
    const firebase = getFirebase();
    firebase.auth().sendPasswordResetEmail(yourEmail);
  };
  mySubmitHandler = event => {
    event.preventDefault();
    this.forgotPassword(this.state.username);
  };
  myChangeHandler = event => {
    this.setState({ username: event.target.value });
  };

  render() {
    return (
      <Fragment>
        <Modal size="mini" open={true} onClose={this.handlecloseModal}>
          <Modal.Header>
            <Icon name="unlock alternate" size="big" />
            Forgot Password ?
          </Modal.Header>
          <Modal.Content>
            <Modal.Description>
              We will send you instructions to reset your password
            </Modal.Description>
            <Form onSubmit={this.mySubmitHandler}>
              <Input
                type="text"
                onChange={this.myChangeHandler}
                icon="mail"
                iconPosition="left"
                placeholder="Email"
              />
              <Input type="submit" onClick={this.open} />
            </Form>
            <Divider horizontal>Or</Divider>

            <Button attached="bottom" onClick={this.handleCloseModal}>
              Cancel
            </Button>
          </Modal.Content>

          {EmailValidator.validate(this.state.username) ? (
            <Confirm
              open={this.state.open}
              onConfirm={this.handleCloseModal}
              content="Password recovery instructions has been send. Please check your email"
              size="mini"
            />
          ) : (
            <Confirm
              open={this.state.open}
              onConfirm={this.handleCloseModal}
              content={
                <Label basic color="red" size="huge">
                  Sorry, that is not a valid email address
                </Label>
              }
              size="mini"
            />
          )}
        </Modal>
      </Fragment>
    );
  }
}
export default withRouter(ForgotPassword);
