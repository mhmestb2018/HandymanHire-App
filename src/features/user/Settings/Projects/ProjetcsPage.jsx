import React, { useState, useEffect, Fragment } from "react";
import { connect } from "react-redux";
import {
  Segment,
  Header,
  Divider,
  Grid,
  Button,
  Container,
  Card
} from "semantic-ui-react";
import { compose } from "redux";
import DropzoneInput from "./DropzoneInput";
import CropperPhotos from "./CropperPhotos";
import {
  uploadProfileImage,
  deletePhoto,
  setMainPhoto
} from "../../../auth/userActions";
import { toastr } from "react-redux-toastr";
import { firestoreConnect } from "react-redux-firebase";
import UserPhotos from "./UserPhotos";
const query = ({ auth }) => {
  return [
    {
      collection: "users",
      doc: auth.uid,
      subcollections: [{ collection: "photos" }],
      storeAs: "photos"
    }
  ];
};
const actions = {
  uploadProfileImage,
  deletePhoto,
  setMainPhoto
};
const mapState = state => ({
  auth: state.firebase.auth,
  profile: state.firebase.profile,
  photos: state.firestore.ordered.photos,
  loading: state.async.loading
});
//hook instead of class component
const ProjectsPage = ({
  uploadProfileImage,
  photos,
  profile,
  deletePhoto,
  setMainPhoto,
  loading
}) => {
  const [files, setFiles] = useState([]);
  const [image, setImage] = useState(null);

  useEffect(() => {
    return () => {
      files.forEach(file => URL.revokeObjectURL(file.preview));
    };
  }, [files]);

  const handleUploadImage = async () => {
    try {
      await uploadProfileImage(image, files[0].name);
      handleCancelCrop();
      toastr.success("Success", "Photo uploaded");
    } catch (error) {
      console.log(error);
      toastr.error("Oops", "Something went wrong");
    }
  };
  const handleCancelCrop = () => {
    setFiles([]);
    setImage(null);
  };

  const handleDeletePhoto = async photo => {
    try {
      await deletePhoto(photo);
    } catch (error) {
      toastr.error(error.message);
    }
  };

  const handleSetMainPhoto = async photo => {
    try {
      await setMainPhoto(photo);
    } catch (error) {
      toastr.error(error.message);
    }
  };
  return (
    <Segment>
      <Header dividing size="large" content="Add photos" textAlign='center' />
      <Card.Group itemsPerRow={3} stackable>
        <Card>
          <Card.Header color="teal" sub content="Step 1 - Add Photo" />
          <Card.Content>
            <DropzoneInput setFiles={setFiles} />
          </Card.Content>
        </Card>

        <Card>
          <Card.Header
            sub
            color="teal"
            content="Step 2 - Resize image"
            centered
          />
          <Card.Content>
            {files.length > 0 && (
              <CropperPhotos
                setImage={setImage}
                imagePreview={files[0].preview}
              />
            )}
          </Card.Content>
        </Card>

        <Card>
          <Card.Header
            sub
            color="teal"
            content="Step 3 - Preview & Upload"
            centered
          />

          {files.length > 0 && (
            <Fragment>
              <Card.Content>
                <div
                  className="img-preview"
                  style={{
                    minHeight: "210px",
                    minWidth: "210px",
                    overflow: "hidden",
                    border: "3px solid black",
                    margin: "auto"
                  }}
                />
              </Card.Content>
              <div className="ui two buttons">
                <Button
                  loading={loading}
                  onClick={handleUploadImage}
                  style={{ width: "100px" }}
                  basic
                  color="blue"
                >
                  Save
                </Button>
                <Button
                  // disabled={loading}
                  onClick={handleCancelCrop}
                  style={{ width: "100px" }}
                  basic
                  color="red"
                >
                  Cancel
                </Button>
              </div>
            </Fragment>
          )}
        </Card>
      </Card.Group>

      <Divider />
      <UserPhotos
        photos={photos}
        profile={profile}
        deletePhoto={handleDeletePhoto}
        setMainPhoto={handleSetMainPhoto}
        loading={loading}
      />
    </Segment>
  );
};

export default compose(
  connect(
    mapState,
    actions
  ),
  firestoreConnect(auth => query(auth))
)(ProjectsPage);
