import React, { Component } from "react";
import { Modal, Button, Divider } from "semantic-ui-react";
import { connect } from "react-redux";
import { closeModal, openModal } from "../modals/modalActions";
import { withRouter } from "react-router-dom";
const actions = { closeModal, openModal };

class UnauthorizedModal extends Component {
  handleCloseModal = () => {
    if (this.props.location.pathname.includes("/jobs")) {
      this.props.closeModal();
    } else {
      this.props.history.goBack();
      this.props.closeModal();
    }
  };
  render() {
    const { openModal } = this.props;
    return (
      <Modal size="mini" open={true} onClose={this.handlecloseModal}>
        <Modal.Header>
          You need to be signed in to do that, Please login or register to see
          this page. To continue as a guest click cancel.
        </Modal.Header>

        <Modal.Content>
          <Modal.Description />
          <Button.Group widths={4}>
            <Button fluid color="green" onClick={() => openModal("LoginModal")}>
              Login
            </Button>
            <Button.Or />
            <Button
              fluid
              color="blue"
              onClick={() => openModal("RegisterModal")}
            >
              Register
            </Button>
          </Button.Group>
          <Divider horizontal>Or</Divider>

          <Button attached="bottom" onClick={this.handleCloseModal}>
            Cancel
          </Button>
        </Modal.Content>
      </Modal>
    );
  }
}

export default withRouter(
  connect(
    null,
    actions
  )(UnauthorizedModal)
);
