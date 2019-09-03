import React, { Fragment } from "react";
import { Grid, Button, Segment, Divider, Transition } from "semantic-ui-react";
import { Link } from "react-router-dom";
import UserMessage from "../../user/UserProfile/UserMessage";

const UserProfileSidebar = ({
  isCurrentUser,
  followMember,
  profile,
  isFollowing,
  unfollowMember
}) => {
  return (
    <Fragment>
   
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
    
 </Fragment>
  );
};
export default UserProfileSidebar;
