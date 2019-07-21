import React from "react";
import { Grid, Header, Item, Segment, Icon, List } from "semantic-ui-react";
import format from "date-fns/format";

const UserProfileDescription = ({ profile }) => {
  let createdAt;
  if (profile.createdAt) {
    createdAt = format(profile.createdAt.toDate(), "d MMM yyyy");
  }
  return (
    <Grid.Column width={12}>
      <Segment>
        <Grid columns={2}>
          <Grid.Column width="10">
            <Header icon="smile" content="About display Name" />
            <p>
              I am a : <strong>{profile.occupation || "tbn"}</strong>
            </p>
            <p>
              Orginally from <strong>{profile.orgin || "tbn"} </strong>
            </p>
            <p>
              Member Since : <strong>{createdAt}</strong>
            </p>
            <p>{profile.description}</p>
          </Grid.Column>
          <Grid.Column width={6}>
            <Header icon="heart outline" content="Interests" />
            <List>
              {profile.interests &&
                profile.interests.map((interests, index) => (
                  <Item key={index}>
                    <Icon name="heart" />
                    <Item.Content>{interests}</Item.Content>
                  </Item>
                ))}
            </List>
           
          </Grid.Column>
        </Grid>
      </Segment>
    </Grid.Column>
  );
};
export default UserProfileDescription;
