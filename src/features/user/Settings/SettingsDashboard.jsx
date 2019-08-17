import React, { Fragment } from "react";
import { Grid, Menu } from "semantic-ui-react";
import SettingsNav from "./SettingsNav";
import { Route, Switch, Redirect } from "react-router-dom";
import BasicPage from "./BasicPage";
import AboutPage from "./AboutPage";
import AccountPage from "./AccountPage";
import { connect } from "react-redux";
import { updatePassword } from "../../auth/authActions";
import { updateProfile } from "../../auth/userActions";
import ProjectsPage from "./Projects/ProjetcsPage";

const actions = {
  updatePassword,
  updateProfile
};
const mapState = state => ({
  providerId: state.firebase.auth.providerData[0].providerId,
  user: state.firebase.profile
});
const SettingsDashboard = ({
  updatePassword,
  providerId,
  user,
  updateProfile
}) => {
  return (
    <Fragment>
      <Menu compact>
        {" "}
        <SettingsNav />
      </Menu>

      <Grid centered>
        <Grid.Column width={16}>
          <Switch>
            <Redirect exact from="/settings" to="/settings/basic" />
            <Route
              path="/settings/basic"
              render={() => (
                <BasicPage initialValues={user} updateProfile={updateProfile} />
              )}
            />
            <Route
              path="/settings/about"
              render={() => (
                <AboutPage initialValues={user} updateProfile={updateProfile} />
              )}
            />
            <Route path="/settings/projects" component={ProjectsPage} />
            <Route
              path="/settings/account"
              render={() => (
                <AccountPage
                  updatePassword={updatePassword}
                  providerId={providerId}
                />
              )}
            />
          </Switch>
        </Grid.Column>
      </Grid>
    </Fragment>
  );
};

export default connect(
  mapState,
  actions
)(SettingsDashboard);
