import React from "react";
import { Grid, Header, Item, Segment } from "semantic-ui-react";
import differenceInYears from "date-fns/differenceInYears";
import LazyLoad from "react-lazyload";

const UserProfileHeader = ({ profile }) => {
  let age;
  if (profile.dateOfBirth) {
    age = differenceInYears(Date.now(), profile.dateOfBirth.toDate());
    age += " years old";
  } else {
    age = "";
  }
  return (
    <Grid.Column width={16}>
      <Segment>
        <Item.Group>
          <Item>
            <LazyLoad
              height={150}
              placeholder={
                <Item.Image
                  avatar
                  size="small"
                  src={"/assets/user.png"}
                  alt="User"
                />
              }
            >
              <Item.Image
                avatar
                size="small"
                alt="User"
                src={profile.photoURL || "/assets/user.png"}
              />
            </LazyLoad>

            <Item.Content style={{ padding: "40px 30px" }}>
              <Header as="h1">{profile.displayName}</Header>
              <br />
              <Header as="h3">{profile.occupation}</Header>
              <br />
              <Header as="h3">
                {age}
                <br />
                {profile.city}
              </Header>
            </Item.Content>
          </Item>
        </Item.Group>
      </Segment>
    </Grid.Column>
  );
};
export default UserProfileHeader;
