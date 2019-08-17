import React from "react";
import { Header, Segment, Feed, Sticky } from "semantic-ui-react";
import ActivityItem from "./ActivityItem";
const RecentActivity = ({ activities, contextRef }) => {
  return (
    <Sticky context={contextRef} offset={100} styleElement={{ zIndex: 0 }}>
      <Header attached="top" content="Recent Jobs Activity" />
      <Segment attached>
        <Feed>
          {activities &&
            activities.map(activity => (
              <ActivityItem key={activity.id} activity={activity} />
            ))}
        </Feed>
      </Segment>
    </Sticky>
  );
};

export default RecentActivity;
