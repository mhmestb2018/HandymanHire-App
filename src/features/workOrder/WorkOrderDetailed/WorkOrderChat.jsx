import React, { Component } from "react";
import { Segment, Comment, Header } from "semantic-ui-react";
import ChatForm from "../WorkOrderDetailed/ChatForm";
import { formatDistance } from "date-fns";
import { Link } from "react-router-dom";

class WorkOrderChat extends Component {
  state = { showReplyForm: false, selectedCommentId: null };

  handleOpenReplyForm = id => () => {
    this.setState({ showReplyForm: true, selectedCommentId: id });
  };

  handleCloseReplyForm = () => {
    this.setState({
      showReplyForm: false,
      selectedCommentId: null
    });
  };
  render() {
    const { addComment, jobId, chat } = this.props;
    const { showReplyForm, selectedCommentId } = this.state;
    return (
      <div>
        <Segment
          textAlign="center"
          attached="top"
          inverted
          color="teal"
          style={{ border: "none" }}
        >
          <Header>Chat about this Enquiry</Header>
        </Segment>
        <Segment attached>
          <Comment.Group>
            {chat &&
              chat.map(comment => (
                <Comment key={comment.id}>
                  <Comment.Avatar
                    src={comment.photoURL || "/assets/user.png"}
                  />
                  <Comment.Content>
                    <Comment.Author as={Link} to={`/profile/${comment.uid}`}>
                      {comment.displayName}
                    </Comment.Author>
                    <Comment.Metadata>
                      {/* <div>{formatDistance(comment.date.toDate(), Date.now())} ago</div> */}
                    </Comment.Metadata>
                    <Comment.Text>{comment.text}</Comment.Text>
                    <Comment.Actions>
                      <Comment.Action
                        onClick={this.handleOpenReplyForm(comment.id)}
                      >
                        Reply
                      </Comment.Action>
                      {showReplyForm && selectedCommentId === comment.id && (
                        <ChatForm
                          parentId={
                            comment.parentId !== 0
                              ? comment.parentId
                              : comment.id
                          }
                          addComment={addComment}
                          jobId={jobId}
                          form={`reply_${comment.id}`}
                          closeForm={this.handleCloseReplyForm}
                        />
                      )}
                    </Comment.Actions>
                  </Comment.Content>

                  {comment.childNodes &&
                    comment.childNodes.map(child => (
                      <Comment.Group key={child.id}>
                        <Comment>
                          <Comment.Avatar
                            src={child.photoURL || "/assets/user.png"}
                          />
                          <Comment.Content>
                            <Comment.Author
                              as={Link}
                              to={`/profile/${child.uid}`}
                            >
                              {child.displayName}
                            </Comment.Author>
                            <Comment.Metadata>
                              <div>
                                {formatDistance(child.date, Date.now())} ago
                              </div>
                            </Comment.Metadata>
                            <Comment.Text>{child.text}</Comment.Text>
                            <Comment.Actions>
                              <Comment.Action
                                onClick={this.handleOpenReplyForm(child.id)}
                              >
                                Reply
                              </Comment.Action>
                              {showReplyForm &&
                                selectedCommentId === child.id && (
                                  <ChatForm
                                    parentId={
                                      child.parentId !== 0
                                        ? child.parentId
                                        : child.id
                                    }
                                    addComment={addComment}
                                    jobId={jobId}
                                    form={`reply_${child.id}`}
                                    closeForm={this.handleCloseReplyForm}
                                  />
                                )}
                            </Comment.Actions>
                          </Comment.Content>
                        </Comment>
                      </Comment.Group>
                    ))}
                </Comment>
              ))}
          </Comment.Group>
          <ChatForm
            parentId={0}
            addComment={addComment}
            jobId={jobId}
            form={"newComment"}
          />{" "}
        </Segment>
      </div>
    );
  }
}

export default WorkOrderChat;
