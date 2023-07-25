import React, { useState } from "react";
import firebase from "firebase/compat/app";
import {v4} from 'uuid'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const ImageUploader = ({ onChange }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [imageUrl, setImageUrl] = useState("");

  // Firebase configuration. Replace these values with your Firebase project config.
  const firebaseConfig = {
    apiKey: "AIzaSyBZD8g_YJkq4xjAEkrBRWbnkjkukCgGyeU",
    authDomain: "qcsimages-f6d0d.firebaseapp.com",
    projectId: "qcsimages-f6d0d",
    storageBucket: "qcsimages-f6d0d.appspot.com",
    messagingSenderId: "387567872939",
    appId: "1:387567872939:web:239270d6bb00af9da740ee",
    measurementId: "G-N02X50PNCB"
  };

  // Initialize Firebase
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleUpload = () => {
    if (!selectedFile) return;

    const storage = getStorage();
    const storageRef = ref(storage, `images/${selectedFile.name + v4()}`);
    const uploadTask = uploadBytesResumable(storageRef, selectedFile);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        setUploadProgress(progress);
      },
      (error) => {
        console.error("Error uploading image:", error);
      },
      async () => {
        try {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          setImageUrl(downloadURL);
          // Pass the image URL to the parent component
          onChange(downloadURL);
        } catch (error) {
          console.error("Error getting download URL:", error);
        }
      }
    );
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload Image</button>
      {uploadProgress > 0 && <p>Upload Progress: {uploadProgress}%</p>}
      {imageUrl && (
        <div>
          <p>Image URL: {imageUrl}</p>
          <img src={imageUrl} alt="Uploaded" style={{ width: "200px", height: "200px" }} />
        </div>
      )}
    </div>
  );
};

export default ImageUploader;






