import React, { Fragment } from "react";
import { Header, Card, Image, Button } from "semantic-ui-react";

const UserPhotos = ({
  photos,
  profile,
  deletePhoto,
  setMainPhoto,
  loading
}) => {
  let filteredPhotos;
  if (photos) {
    filteredPhotos = photos.filter(photo => {
      return photo.url !== profile.photoURL;
    });
  }
  return (
    <Fragment>
      <Header
        dividing
        content="Your's photos"
        size="large"
        textAlign="center"
      />
      <Card.Group itemsPerRow={6} stackable>
        <Card>
          <Card.Content>
            <Image src={profile.photoURL || "/assets/user.png"} alt="User" />
          </Card.Content>
          <Card.Content extra>
            <Card.Header style={{ color: "green" }}>Main photo</Card.Header>
          </Card.Content>
        </Card>
        {photos &&
          filteredPhotos.map(photo => (
            <Card key={photo.id}>
              <Card.Content>
                <Image src={photo.url} alt="Projects" />
              </Card.Content>

              <div className="ui two buttons">
                <Button
                  loading={loading}
                  onClick={() => setMainPhoto(photo)}
                  basic
                  color="green"
                >
                  Main
                </Button>
                <Button
                  onClick={() => deletePhoto(photo)}
                  basic
                  icon="trash"
                  color="red"
                />
              </div>
            </Card>
          ))}
      </Card.Group>
    </Fragment>
  );
};

export default UserPhotos;
