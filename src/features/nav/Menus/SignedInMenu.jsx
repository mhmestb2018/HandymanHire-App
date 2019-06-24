import React from "react";
import { Menu, Dropdown, Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";

const SignedInMenu = ({ signOut }) => {
  return (
    <Menu.Item position="right">
      <Icon name="user" size="big" />
      <Dropdown pointing="top left" text="Username">
        <Dropdown.Menu>
          <Dropdown.Item text="Create Job Enquiry" icon="plus" />
          <Dropdown.Item text="My Jobs" icon="calendar" />
          <Dropdown.Item text="My Proposals" icon="users" />
          <Dropdown.Item text="My Profile" icon="user" />
          <Dropdown.Item
            as={Link}
            to="/settings"
            text="Settings"
            icon="settings"
          />
          <Dropdown.Item onClick={signOut} text="Sign Out" icon="power" />
        </Dropdown.Menu>
      </Dropdown>
    </Menu.Item>
  );
};

export default SignedInMenu;
