import React, { Component } from "react";
import { Segment, Button, label, Form } from "semantic-ui-react";
import { connect } from "react-redux";
import {
  createJob,
  updateJob
} from "../../workOrder/WorkList/workOrderActions";
import cuid from "cuid";

const mapState = (state, ownProps) => {
  const jobId = ownProps.match.params.id;
  let job = {
    title: "",
    date: "",
    city: "",
    address: "",
    orderedBy: ""
  };
  // if (jobId && state.jobs.lenght > 0) {
  job = state.jobs.filter(job => job.id === jobId)[0];
  // }
  return {
    job
  };
};
const actions = {
  createJob,
  updateJob
};
class WorkOrderForm extends Component {
  state = {
    ...this.props.job
  };

  componentDidMount() {
    if (this.props.selectedJob !== null) {
      this.setState({
        ...this.props.selectedJob
      });
    }
  }
  handleFormSubmit = jb => {
    jb.preventDefault();
    if (this.state.id) {
      this.props.updateJob(this.state);
      this.props.history.push(`/jobs/${this.state.id}`)
    } else {
      // this.props.createJob(this.state);
      const newJob = {
        ...this.state,
        id: cuid(),
        hostPhotoURL: "/assets/categoryImages/logo2.png"
      };
      this.props.createJob(newJob);
      this.props.history.push(`/jobs`)
    }
  };
  handleInputChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value
    });
  };
  render() {
    const { title, date, city, address, orderedBy } = this.state;
    return (
      <Segment>
        <Form onSubmit={this.handleFormSubmit} autoComplete="off">
          <Form.Field>
            <label>Job Title</label>
            <input
              name="title"
              onChange={this.handleInputChange}
              value={title}
              placeholder="Job title"
            />
          </Form.Field>
          <Form.Field>
            <label>Job Date</label>
            <input
              name="date"
              onChange={this.handleInputChange}
              value={date}
              type="date"
              placeholder="Job Date"
            />
          </Form.Field>
          <Form.Field>
            <label>City</label>
            <input
              name="city"
              onChange={this.handleInputChange}
              value={city}
              placeholder="City job is taking place"
            />
          </Form.Field>
          <Form.Field>
            <label>Address</label>
            <input
              name="address"
              onChange={this.handleInputChange}
              value={address}
              placeholder="Enter the address of the job"
            />
          </Form.Field>
          <Form.Field>
            <label>Ordered By</label>
            <input
              name="orderedBy"
              onChange={this.handleInputChange}
              value={orderedBy}
              placeholder="Enter the name of person Ordered"
            />
          </Form.Field>
          <Button positive type="submit">
            Submit
          </Button>
          <Button onClick={this.props.history.goBack} type="button">
            Cancel
          </Button>
        </Form>
      </Segment>
    );
  }
}
export default connect(
  mapState,
  actions
)(WorkOrderForm);
