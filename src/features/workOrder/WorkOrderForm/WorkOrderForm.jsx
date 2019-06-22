import React, { Component } from "react";
import { Segment, Button, label, Form } from "semantic-ui-react";

class WorkOrderForm extends Component {
  render() {
    const { cancelFormOpen } = this.props;
    return (
      <Segment>
        <Form>
          <Form.Field>
            <label>Job Title</label>
            <input placeholder="First Name" />
          </Form.Field>
          <Form.Field>
            <label>Job Date</label>
            <input type="date" placeholder="Job Date" />
          </Form.Field>
          <Form.Field>
            <label>City</label>
            <input placeholder="City job is taking place" />
          </Form.Field>
          <Form.Field>
            <label>Venue</label>
            <input placeholder="Enter the Venue of the event" />
          </Form.Field>
          <Form.Field>
            <label>Ordered By</label>
            <input placeholder="Enter the name of person Ordered" />
          </Form.Field>
          <Button positive type="submit">
            Submit
          </Button>
          <Button onClick={cancelFormOpen} type="button">
            Cancel
          </Button>
        </Form>
      </Segment>
    );
  }
}
export default WorkOrderForm;
