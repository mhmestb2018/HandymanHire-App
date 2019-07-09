import React, { Component } from "react";
import { Segment, Button, Form, Grid, Header } from "semantic-ui-react";
import { connect } from "react-redux";
import {
  createJob,
  updateJob
} from "../../workOrder/WorkList/workOrderActions";
import cuid from "cuid";
import { reduxForm, Field } from "redux-form";
import TextInput from "../../../app/common/form/TextInput";
import TextArea from "../../../app/common/form/TextArea";
import SelectInput from "../../../app/common/form/SelectInput";
import {
  composeValidators,
  combineValidators,
  isRequired,
  hasLengthGreaterThan
} from "revalidate";
import DateInput from "../../../app/common/form/DateInput";
const mapState = (state, ownProps) => {
  const jobId = ownProps.match.params.id;
  let job = {
    // title: "",
    // date: "",
    // city: "",
    // address: "",
    // orderedBy: ""
  };
  // if (jobId && state.jobs.lenght > 0) {
  job = state.jobs.filter(job => job.id === jobId)[0];
  // }
  return {
    initialValues: job
  };
};
const actions = {
  createJob,
  updateJob
};
const validate = combineValidators({
  title: isRequired({ message: "The job title is required" }),
  category: isRequired({ message: "Category is required" }),
  description: composeValidators(
    isRequired({ message: "Please enter a description" }),
    hasLengthGreaterThan(4)({
      message: "Description needs to be at least 5 characters"
    })
  )(),
  city: isRequired({ message: "Please provide County or City" }),
  date: isRequired({ message: "Date is required" })
});
const category = [
  { key: "painting", text: "Painting", value: "painting" },
  { key: "home renovation", text: "Home Renovation", value: "home renovation" },
  { key: "cleaning", text: "Cleaning", value: "cleaning" },
  {
    key: "electrical installation",
    text: "Electrical Installation",
    value: "electrical installation"
  },
  { key: "plumbing", text: "Plumbing", value: "plumbing" },
  {
    key: "home appliances repair",
    text: "Home Appliances Repair",
    value: "home appliances repair"
  },
  {
    key: "furniture repair & restoration ",
    text: "Furniture Repair & Restoration ",
    value: "furniture repair & restoration "
  }
];

class WorkOrderForm extends Component {
  // state = {
  //   ...this.props.job
  // };

  // componentDidMount() {
  //   if (this.props.selectedJob !== null) {
  //     this.setState({
  //       ...this.props.selectedJob
  //     });
  //   }
  // }
  onFormSubmit = values => {
    if (this.props.initialValues.id) {
      this.props.updateJob(values);
      this.props.history.push(`/jobs/${this.props.initialValues.id}`);
    } else {
      // this.props.createJob(this.state);
      const newJob = {
        ...this.values,
        id: cuid(),
        hostPhotoURL: "/assets/categoryImages/logo2.png",
        orderedBy: "Bob"
      };
      this.props.createJob(newJob);
      this.props.history.push(`/jobs/${newJob.id}`);
    }
  };
  // handleInputChange = ({ target: { name, value } }) => {
  //   this.setState({
  //     [name]: value
  //   });
  // };
  render() {
    const {
      history,
      initialValues,
      invalid,
      submitting,
      pristine
    } = this.props;
    // const { title, date, city, address, orderedBy } = this.state;
    return (
      <Grid>
        <Grid.Column width={10}>
          <Segment>
            <Header sub color="blue" content="Work Order Offer Details" />
            <Form
              onSubmit={this.props.handleSubmit(this.onFormSubmit)}
              autoComplete="off"
            >
              <Field
                name="title"
                component={TextInput}
                placeholder="Give your work order title"
              />
              <Field
                name="category"
                component={SelectInput}
                options={category}
                placeholder="Category of job"
              />
              <Field
                name="description"
                component={TextArea}
                rows={6}
                placeholder="Give more details about job"
              />
              <Header sub color="blue" content="Work Order Location Details" />
              <Field
                name="city"
                component={TextInput}
                placeholder="Your Region"
              />
              <Field
                name="address"
                component={TextInput}
                placeholder="Your address"
              />
              <Field
                name="date"
                component={DateInput}
                dateFormat="dd LLL yyyy h:mm a"
                placeholder="Date that you expect from contractor to start the job"
              />

              {/* <Form.Field>
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
          </Form.Field> */}
              <Button
                disabled={invalid || submitting || pristine}
                positive
                type="submit"
              >
                Submit
              </Button>
              <Button
                onClick={
                  initialValues.id
                    ? () => history.push(`/jobs/${initialValues.id}`)
                    : () => history.push("/jobs")
                }
                type="button"
              >
                Cancel
              </Button>
            </Form>
          </Segment>
        </Grid.Column>
      </Grid>
    );
  }
}
export default connect(
  mapState,
  actions
)(reduxForm({ form: "Form", validate })(WorkOrderForm));
