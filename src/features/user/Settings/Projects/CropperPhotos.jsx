import React, { Component, createRef } from "react";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";

class CropperPhotos extends Component {
  cropper = createRef();
  cropImage = () => {
    const { setImage } = this.props;
    if (typeof this.cropper.current.getCroppedCanvas() === "undefined") {
      return;
    }
    //create Binary Large Object from cropped file in order to store in firebase
    this.cropper.current.getCroppedCanvas().toBlob(blob => {
      setImage(blob);
    }, "image/webp");
  };
  render() {
    const { imagePreview } = this.props;
    return (
      <Cropper
        ref={this.cropper}
        src={imagePreview}
        style={{ height: 200, width: "100%" }}
        // Cropper.js options
        preview=".img-preview"
        aspectRatio={1}
        viewMode={1}
        dragMode="move"
        guides={false}
        scalable={true}
        cropBoxMovable={true}
        cropBoxResizable={true}
        crop={this.cropImage}
      />
    );
  }
}
export default CropperPhotos;
