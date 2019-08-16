import React from "react";
import { Menu, Dropdown, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";

const SignedInMenu = ({ signOut, profile, auth }) => {
  return (
    <Menu.Item position="right">
      {/* <Icon name="user" size="big" /> */}
      <Image
        avatar
        size="mini"
        spaced="right"
        src={profile.photoURL || "/assets/user.png"}
      />
      <Dropdown pointing="top right" text={profile.displayName}>
        <Dropdown.Menu>
          <Dropdown.Item
            text="Post a job"
            icon="plus"
            as={Link}
            to={`/createJob`}
          />
          <Dropdown.Item as={Link} to="/members" text="Members" icon="users" />
          {/* <Dropdown.Item text="My Proposals" icon="users" /> */}
          <Dropdown.Item
            as={Link}
            to={`/profile/${auth.uid}`}
            text="My Profile"
            icon="user"
          />
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
