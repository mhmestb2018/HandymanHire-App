import React from "react"
import { connect } from "react-redux"
import { compose } from "redux"
import { firestoreConnect } from "react-redux-firebase"
import { Grid, Segment, Header, Card, Icon } from "semantic-ui-react"
import MemberCard from "./MemberCard"

const query = ({ auth }) => [
  {
    collection: "users",
    doc: auth.uid,
    subcollections: [{ collection: "following" }],
    storeAs: "following"
  },
  {
    collection: "users",
    doc: auth.uid,
    subcollections: [{ collection: "followers" }],
    storeAs: "followers"
  }
]
const mapStateToProps = ({ firebase, firestore }) => ({
  followings: firestore.ordered.following,
  followers: firestore.ordered.followers,
  auth: firebase.auth
})
const renderEmptyCard = () => (
  <Header as="h3" icon textAlign="center">
    <Icon name="users" />
    <Header.Content>There's no member</Header.Content>
  </Header>
)

const MembersDashboard = ({ followings, followers }) => (
  <Grid>
    <Grid.Column width={16}>
      <Segment>
        <Header dividing content="Members following me" />
        <Card.Group itemsPerRow={8} stackable>
          {followers ? (
            followers.length > 0 ? (
              followers.map(follower => (
                <MemberCard key={follower.id} user={follower} />
              ))
            ) : (
              renderEmptyCard()
            )
          ) : (
            <h4>Loading...</h4>
          )}
        </Card.Group>
      </Segment>
      <Segment>
        <Header dividing content="Following Members" />
        <Card.Group itemsPerRow={8} stackable>
          {followings ? (
            followings.length > 0 ? (
              followings.map(following => (
                <MemberCard key={following.id} user={following} />
              ))
            ) : (
              renderEmptyCard()
            )
          ) : (
            <h4>Loading...</h4>
          )}
        </Card.Group>
      </Segment>
    </Grid.Column>
  </Grid>
)

export default compose(
  connect(mapStateToProps),
  firestoreConnect(props => query(props))
)(MembersDashboard)
