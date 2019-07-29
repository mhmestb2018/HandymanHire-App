import React, { Component } from "react";
import { Form, Button } from "semantic-ui-react";
import { Field, reduxForm } from "redux-form";
import TextArea from "../../../app/common/form/TextArea";

class ChatForm extends Component {
  handleChatFormSubmit = values => {
    const { parentId, addComment, reset, jobId, closeForm } = this.props;
    addComment(jobId, values, parentId);
    parentId !== 0 && closeForm();
    reset();
  };

  render() {
    return (
      <Form onSubmit={this.props.handleSubmit(this.handleChatFormSubmit)}>
        <Field name="comment" type="text" component={TextArea} rows={2} />
        <Button content="Add Reply" labelPosition="left" icon="edit" primary />
      </Form>
    );
  }
}

export default reduxForm({ Fields: "comment" })(ChatForm);
