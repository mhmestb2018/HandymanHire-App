import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Icon, Header } from "semantic-ui-react";

const DropzoneInput = ({ setFiles }) => {
  const onDrop = useCallback(
    acceptedFiles => {
      setFiles(
        acceptedFiles.map(file =>
          Object.assign(file, {
            preview: URL.createObjectURL(file)
          })
        )
      );
    },
    [setFiles]
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    accept: "image/*"
  });

  return (
    <div
      {...getRootProps()}
      className={"dropzone " + (isDragActive && "dropzone--isActive")}
      style={{ height: "15em", padding: "4em" }}
    >
      {" "}
      <input {...getInputProps()} />
      <Icon name="upload" size="large" />
      <Header as="h4" content="Please click to upload or drop image here" />
    </div>
  );
};
export default DropzoneInput;
