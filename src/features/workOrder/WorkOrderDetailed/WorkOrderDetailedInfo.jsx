import React, { useState } from "react";
import { Segment, Grid, Icon, Button } from "semantic-ui-react";
import WorkOrderDetailedMap from "./WorkOrderDetailedMap";
import { format, parseISO } from "date-fns";

const WorkOrderDetailedInfo = ({ job }) => {
  const [isMapOpen, showMapToogle] = useState(false);
  return (
    <Segment.Group>
      <Segment attached="top">
        <Grid>
          <Grid.Column width={1}>
            <Icon size="large" color="blue" name="info" />
          </Grid.Column>
          <Grid.Column width={15}>
            <p>{job.description}</p>
          </Grid.Column>
        </Grid>
      </Segment>
      <Segment attached>
        <Grid verticalAlign="middle">
          <Grid.Column width={1}>
            <Icon name="calendar" size="large" color="blue" />
          </Grid.Column>
          <Grid.Column width={15}>
            {job.date &&
            <span>
              {format(parseISO(job.date), "EEEE do LLL yyyy")}
              {/* |at{""} {format(parseISO(job.date), "h:mm a")} */}
            </span>}
          </Grid.Column>
        </Grid>
      </Segment>
      <Segment attached>
        <Grid verticalAlign="middle">
          <Grid.Column width={1}>
            <Icon name="marker" size="large" color="blue" />
          </Grid.Column>
          <Grid.Column width={11}>
            <span>{job.address}</span>
          </Grid.Column>
          <Grid.Column width={4}>
            <Button
              onClick={() => showMapToogle(!isMapOpen)}
              color="blue"
              size="tiny"
              content={isMapOpen ? "Hide map" : "Show Map"}
            />
          </Grid.Column>
        </Grid>
      </Segment>
      {isMapOpen && (
        <WorkOrderDetailedMap
          lat={job.addressLatLng.lat}
          lng={job.addressLatLng.lng}
        />
      )}
    </Segment.Group>
  );
};

export default WorkOrderDetailedInfo;
