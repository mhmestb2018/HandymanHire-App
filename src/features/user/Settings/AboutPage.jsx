import React from "react";
import {
  Button,
  Divider,
  Form,
  Header,
  Segment,
  Card
} from "semantic-ui-react";
import { Field, reduxForm } from "redux-form";
import RadioInput from "../../../app/common/form/RadioInput";
import TextInput from "../../../app/common/form/TextInput";
import TextArea from "../../../app/common/form/TextArea";
import PlaceInput from "../../../app/common/form/PlaceInput";
import SelectInput from "../../../app/common/form/SelectInput";

const interests = [
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
    key: "furniture repair & restoration",
    text: "Furniture Repair & Restoration",
    value: "furniture repair & restoration"
  }
];

const AboutPage = ({ pristine, submitting, handleSubmit, updateProfile }) => {
  return (
    <Segment>
      <Header dividing size="large" content="About me" />
      <Header as="h3">
        Complete your profile to get the most out of this site
      </Header>
      <Form onSubmit={handleSubmit(updateProfile)}>
        <Form.Group grouped>
          {/* <label>: </label> */}
          {/* <Field name="status" component={RadioInput} type="radio" value="single" label="Handyman" /> */}
          <Card>
            <p className="radio">
              For the what purpose you are going to use this service mainly :
            </p>
            <Field
              className="radio"
              name="status"
              component={RadioInput}
              type="radio"
              value="Handyman"
              label=" Offer handyman service"
            />
            <Field
              className="radio"
              name="status"
              component={RadioInput}
              type="radio"
              value="Hire"
              label=" Post a jobs"
            />
          </Card>
        </Form.Group>
        <Divider />
        <Field
          name="about"
          component={TextArea}
          placeholder="Tell us about yourself"
        />
        <Field
          name="interests"
          component={SelectInput}
          options={interests}
          value="interests"
          multiple={true}
          placeholder="Category of job that you are interested"
        />
        <Field
          width={8}
          name="occupation"
          type="text"
          component={TextInput}
          placeholder="Occupation"
        />
        <Field
          width={8}
          name="city"
          options={{ types: ["(cities)"] }}
          component={PlaceInput}
          placeholder="Your city or county"
        />
        <Divider />
        <Button
          disabled={pristine || submitting}
          size="large"
          positive
          content="Update profile"
        />
      </Form>
    </Segment>
  );
};

export default reduxForm({
  form: "userProfile",
  enableReinitialize: true,
  destroyOnUnmount: false
})(AboutPage);
