/*global google*/
import React, { Component } from "react";
import { Segment, Button, Form, Grid, Header } from "semantic-ui-react";
import { connect } from "react-redux";
import {
  createJob,
  updateJob,
  cancelToggle
} from "../../workOrder/WorkList/workOrderActions";
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
import PlaceInput from "../../../app/common/form/PlaceInput";
import { geocodeByAddress, getLatLng } from "react-places-autocomplete";
import { withFirestore } from "react-redux-firebase";

const mapState = (state, ownProps) => {
  const jobId = ownProps.match.params.id;
  let job = {};
  //did not work with if before firestore
  if (
    state.firestore.ordered.workOrders &&
    state.firestore.ordered.workOrders.lenght > 0
  ) {
    job =
      state.firestore.ordered.workOrders.filter(job => job.id === jobId)[0] ||
      {};
  }
  return {
    initialValues: job,
    job
  };
};
const actions = {
  createJob,
  updateJob,
  cancelToggle
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
  state = {
    cityLatLng: {},
    addressLatLng: {}
  };
  async componentDidMount() {
    const { firestore, match } = this.props;
    await firestore.setListener(`workOrders/${match.params.id}`);
  }

  // when provided 'if (this.props.initialValues.id)' did not work
  onFormSubmit = async values => {
    values.addressLatLng = this.state.addressLatLng;
    try {
      if (this.props.initialValues.id) {
        if (Object.keys(values.addressLatLng).length === 0) {
          values.addressLatLng = this.props.job.addressLatLng;
        }
        this.props.updateJob(values);
        this.props.history.push(`/workOrders/${this.props.initialValues.id}`);
      } else {
        let createdJob = await this.props.createJob(values);
        this.props.history.push(`/workOrders/${createdJob.id}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  handleCitySelect = selectedCity => {
    geocodeByAddress(selectedCity)
      .then(results => getLatLng(results[0]))
      .then(latlng => {
        this.setState({
          cityLatLng: latlng
        });
      })
      .then(() => {
        this.props.change("city", selectedCity);
      });
  };
  handleAddressSelect = selectedAddress => {
    geocodeByAddress(selectedAddress)
      .then(results => getLatLng(results[0]))
      .then(latlng => {
        this.setState({
          addressLatLng: latlng
        });
      })
      .then(() => {
        this.props.change("address", selectedAddress);
      });
  };
  // handleInputChange = ({ target: { name, value } }) => {
  //   this.setState({
  //     [name]: value
  //   });
  // };
  render() {
    const {
      // history,
      // initialValues,
      invalid,
      submitting,
      pristine,
      job,
      cancelToggle
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
                component={PlaceInput}
                options={{ types: ["(cities)"] }}
                onSelect={this.handleCitySelect}
                placeholder="Your Region"
              />
              <Field
                name="address"
                component={PlaceInput}
                options={{
                  location: new google.maps.LatLng(this.state.cityLatLng),
                  radius: 1000,
                  types: ["establishment"]
                }}
                onSelect={this.handleAddressSelect}
                placeholder="Your address"
              />
              <Field
                name="date"
                component={DateInput}
                dateFormat="dd LLL yyyy h:mm a"
                placeholder="Date that you expect from contractor to start the job"
              />

              <Button
                disabled={invalid || submitting || pristine}
                positive
                type="submit"
              >
                Submit
              </Button>

              {/* Do not working, conflict with create new job */}
              {/* <Button
                onClick={
                  initialValues.id
                    ? () => history.push(`/jobs/${initialValues.id}`)
                    : () => history.push("/jobs")
                }
                type="button" >Cancel</Button> */}

              <Button onClick={this.props.history.goBack} type="button">
                Cancel
              </Button>
              <Button
                type="button"
                color={job.cancelled ? "blue" : "red"}
                content={job.cancelled ? "Reactive Enquiry" : "Cancel Enquiry"}
                onClick={() => cancelToggle(!job.cancelled, job.id)}
                floated="right"
              />
            </Form>
          </Segment>
        </Grid.Column>
      </Grid>
    );
  }
}
export default withFirestore(
  connect(
    mapState,
    actions
  )(
    reduxForm({ form: "workOrderForm", validate, enableReinitialize: true })(
      WorkOrderForm
    )
  )
);
