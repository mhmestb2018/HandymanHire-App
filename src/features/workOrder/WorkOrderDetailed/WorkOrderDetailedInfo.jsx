import React, { useState } from "react";
import { Segment, Grid, Icon, Button } from "semantic-ui-react";
import WorkOrderDetailedMap from "./WorkOrderDetailedMap";
import { format } from "date-fns";

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
            {job.date && (
              <span>
                Post expire on {format(job.date.toDate(), "EEEE do LLL yyyy")}
                {/* |at{""} {format(parseISO(job.date), "h:mm a")} */}
              </span>
            )}
          </Grid.Column>
        </Grid>
      </Segment>
      <Segment attached>
        <Grid stackable>
          <Grid.Column width={1}>
            <Icon name="marker" size="large" color="blue" />
          </Grid.Column>
          <Grid.Column width={11}>
            {job.city}
            <br />
            {job.address}
          </Grid.Column>
          <Grid.Column width={4}>
            <Button
              onClick={() => showMapToogle(!isMapOpen)}
              color="blue"
              content={isMapOpen ? "Hide map" : "Show Map"}
              attached="bottom"
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
