// import React, { Component } from "react";
// import {
//   Button,
//   Divider,
//   Image,
//   Transition,
//   Message,
//   Segment,
//   Header
// } from "semantic-ui-react";

// class UserMessage extends Component {
//   render() {
//     const { profile } = this.props;
//     return (
//       <Segment>
//         <Message
//           attached
//           icon="inbox"
//           header="Have you heard about our mailing list?"
//           content="Get the best news in your e-mail every day."
//         />
//         <Header as="h4">name:{profile.displayName}</Header>
//       </Segment>
//     );
//   }
// }
// export default UserMessage;

import React from "react";
import {
  Grid,
  Header,
  Item,
  Segment,
  Button,
  Message
} from "semantic-ui-react";
import ReactContactForm from "react-mail-form";
const UserMessage = ({ profile }) => {
  const  email = profile.email;
  return (
    <Segment>
      <Message attached>You are sending email to {profile.displayName}</Message>

      {/* <Item.Group>
        <Item>
          <Item.Content>
            <br />
            <Header as="h3">{email}</Header>
            <br />
          </Item.Content>
        </Item>
      </Item.Group> */}

    
      {email &&  <ReactContactForm to={email} />}
      <Button
        color="blue"
        icon="mail outline"
        fluid
        basic
        content="Send email to user"
      />
    </Segment>
  );
};
export default UserMessage;
