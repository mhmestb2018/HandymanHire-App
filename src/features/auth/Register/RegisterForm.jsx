import React from "react";
import {
  Form,
  Segment,
  Button,
  Label,
  Divider,
  Confirm
} from "semantic-ui-react";
import { Field, reduxForm } from "redux-form";
import TextInput from "../../../app/common/form/TextInput";
import { connect } from "react-redux";
import { registerUser, socialLogin } from "../../auth/authActions";
import { combineValidators, isRequired } from "revalidate";
import SocialLogin from "../SocialLogin/SocialLogin";

const actions = {
  registerUser,
  socialLogin
};
const validate = combineValidators({
  displayName: isRequired("displayName"),
  email: isRequired("email"),
  password: isRequired("password")
});
const RegisterForm = ({
  handleSubmit,
  error,
  registerUser,
  invalid,
  submitting,
  socialLogin
}) => {
  // const { open, result } = this.state
  // const [isChecked, setIsChecked] = React.useState(undefined);
  return (
    <Form size="large" onSubmit={handleSubmit(registerUser)}>
      <Segment>
        <Field
          name="displayName"
          type="text"
          component={TextInput}
          placeholder="Username"
        />
        <Field
          name="email"
          type="text"
          component={TextInput}
          placeholder="Email"
        />
        <Field
          name="password"
          type="password"
          component={TextInput}
          placeholder="Password"
        />
        {error && (
          <Label basic color="red">
            {error}
          </Label>
        )}

        <Button
          disabled={invalid || submitting}
          fluid
          size="large"
          color="teal"
        >
          Register
        </Button>

        <Divider horizontal>Or</Divider>
        <SocialLogin socialLogin={socialLogin} />
        {/* <Segment compact>
          <Checkbox
            name="terms"
            inverted
            isChecked={isChecked}
            hasError
            onChange={setIsChecked}
            label="I accept the Terms of Service"
          />
        </Segment> */}
      </Segment>
    </Form>
  );
};

export default connect(
  null,
  actions
)(reduxForm({ form: "registerForm", validate })(RegisterForm));
