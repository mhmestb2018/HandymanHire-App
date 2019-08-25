import React from "react";
import { Grid, Button, Segment } from "semantic-ui-react";
import { Link } from "react-router-dom";

const UserProfileSidebar = ({
  isCurrentUser,
  followMember,
  profile,
  isFollowing,
  unfollowMember
}) => {
  return (
    <Grid.Column width={4}>
      <Segment>
        {isCurrentUser && (
          <Button
            as={Link}
            to="/settings"
            color="black"
            icon="edit"
            fluid
            basic
            content="Edit Profile"
          />
        )}

        {!isCurrentUser && !isFollowing && (
          <Button
            onClick={() => followMember(profile)}
            color="blue"
            fluid
            basic
            content="Follow member"
          />
        )}

        {!isCurrentUser && isFollowing && (
          <Button
            onClick={() => unfollowMember(profile)}
            color="green"
            fluid
            basic
            content="Unfollow member"
          />
        )}
      </Segment>
    </Grid.Column>
  );
};
export default UserProfileSidebar;
