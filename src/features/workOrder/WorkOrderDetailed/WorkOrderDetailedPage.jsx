import React from "react";
import { Grid } from "semantic-ui-react";
import  WorkOrderDetailedHeader  from "./WorkOrderDetailedHeader";
import WorkOrderDetailedInfo from "./WorkOrderDetailedInfo";
import WorkOrderChat from "./WorkOrderChat";
import EventDetailedSidebar from "./EventDetailedSidebar";

const WorkOrderDetailedPage = () => {
  return (
    <Grid>
      <Grid.Column width={10}>
        <WorkOrderDetailedHeader />
        <WorkOrderDetailedInfo />
        <WorkOrderChat />
      </Grid.Column>
      <Grid.Column width={6}>
        <EventDetailedSidebar />
      </Grid.Column>
    </Grid>
  );
};

export default WorkOrderDetailedPage;
