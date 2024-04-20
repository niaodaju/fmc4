import React, { useState } from 'react';
import Dropzone from 'react-dropzone';
import axios from 'axios';
 
const ImageUpload = () => {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
 
  const handleDrop = files => {
    setUploading(true);
    const formData = new FormData();
    files.forEach(file => {
      formData.append('images[]', file);
    });
 
    const config = {
      onUploadProgress: progressEvent => {
        const { loaded, total } = progressEvent;
        const percent = Math.round((loaded * 100) / total);
        setProgress(percent);
      },
    };
 
    axios.post('/api/upload', formData, config)
      .then(response => {
        console.log(response);
        setUploading(false);
        setProgress(0);
      })
      .catch(error => {
        console.error(error);
        setUploading(false);
        setProgress(0);
      });
  };
 
  return (
    <div>
      <Dropzone onDrop={handleDrop} multiple>
        {({ getRootProps, getInputProps }) => (
          <div {...getRootProps()}>
            <input {...getInputProps()} />
            <p>Drag 'n' drop images here, or click to select images to upload.</p>
          </div>
        )}
      </Dropzone>
      {uploading && <progress value={progress} max="100" />}
    </div>
  );
};
 
export default ImageUpload;