import React from "react";
import GoogleMapReact from "google-map-react";
import { Icon } from "semantic-ui-react";
import { Segment } from "semantic-ui-react";

const Marker = () => <Icon name="marker" size="big" color="red" />;
const WorkOrderDetailedMap = ({ lat, lng }) => {
  const zoom = 14;
  return (
    <Segment attached="bottom" style={{ padding: 0 }}>
      <div style={{ height: "50vh", width: "100%" }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyCBsc3BJ8BAvWZL8Z_7mfL3CusUy5R0FQI" }}
          defaultCenter={{ lat, lng }}
          defaultZoom={zoom}
        >
          <Marker lat={lat} lng={lng} />
        </GoogleMapReact>
      </div>
    </Segment>
  );
};

export default WorkOrderDetailedMap;
